import json
from urllib.parse import parse_qs, urlparse
import pandas as pd
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder
from http.server import BaseHTTPRequestHandler, HTTPServer


# Function to fetch JSON data from the URL
def fetch_injuries_history():
    try:
        url = "http://localhost:3000/injuriesHistory"
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()  # Parse JSON response
    except requests.exceptions.RequestException as e:
        print(f"Error fetching injuries history: {e}")
        raise e

# Function to preprocess historical injury data


def preprocess_injury_data(injuries_history):
    # Convert JSON data to DataFrame
    data = pd.DataFrame(injuries_history)

    # Drop entries with missing return dates
    data.dropna(subset=['returnDate'], inplace=True)

    # Encode categorical variables
    label_encoder = LabelEncoder()
    data['injuryTypeEncoded'] = label_encoder.fit_transform(data['injuryType'])

    # Calculate injury duration in days
    data['returnDate'] = pd.to_datetime(data['returnDate'])
    data['injuryDate'] = pd.to_datetime(data['injuryDate'])
    data['injury_duration'] = (data['returnDate'] - data['injuryDate']).dt.days

    # Select features and target variable
    X = data[['injuryTypeEncoded']]
    y = data['injury_duration']

    return X, y, label_encoder


# Fetch injuries history data
try:
    injuries_history = fetch_injuries_history()
    print("Fetched injuries history data successfully.")
except Exception as e:
    print("Error fetching injuries history:", e)
    exit()

# Preprocess injuries history data
try:
    X, y, label_encoder = preprocess_injury_data(injuries_history)
    print("Preprocessed injuries history data successfully.")
except Exception as e:
    print("Error preprocessing injuries history data:", e)
    exit()

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Train a Random Forest regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions on the testing data
y_pred = model.predict(X_test)

# Evaluate the model
mae = mean_absolute_error(y_test, y_pred)
print('Mean Absolute Error:', mae)


# HTTPRequestHandler class
class HTTPRequestHandler(BaseHTTPRequestHandler):
    # GET method
    def do_GET(self):
        if self.path.startswith('/predict'):
            # Send response status code
            self.send_response(200)

        # Send headers
            self.send_header('Content-type', 'application/json')
            self.end_headers()

        # Extract injury type from query parameters
            query_params = parse_qs(urlparse(self.path).query)
            if 'injury_type' in query_params:
                injury_type = query_params['injury_type'][0]
            # Encode injury type
                injury_type_encoded = label_encoder.transform([injury_type])[0]
            # Predict injury duration
                predicted_duration = model.predict([[injury_type_encoded]])
                predicted_injury = predicted_duration[0]
                
            # Send predicted injury duration as JSON response
                response_body = json.dumps(
                    {'predicted_injury_duration': predicted_injury})
                self.wfile.write(bytes(response_body, 'utf-8'))
            else:
            # Send error response if injury type is not provided
                self.send_response(400)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(
                    bytes('Error: Please provide injury_type parameter', 'utf-8'))
        else:
        # Send error response for unsupported routes
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(bytes('Error: Route not found', 'utf-8'))

    

def run_server(server_class=HTTPServer, handler_class=HTTPRequestHandler, port=8001):
    # Server settings
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting Python server on port {port}...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
        print(f'Stopping Python server on port {port}...')


if __name__ == '__main__':
    run_server()
