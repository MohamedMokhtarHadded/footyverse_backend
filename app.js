const express = require('express');
const cors = require('cors');

const app = express();
const dbConfig = require('./config/db.json');
const { default: mongoose } = require('mongoose');
const trainingRoutes = require('./routes/Training');
const exerciseRoutes = require('./routes/Exercise');
const injuryRoutes = require('./routes/injury');
const scoutingRoutes = require('./routes/scouting');
const calendarRoutes = require('./routes/calendar');
const Injury = require('./models/Injury');
const Training = require('./models/Training');
const statsRoutes = require('./routes/stats');
const recoveryRoutes = require('./routes/recovery');




const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.json());

const userRoute = require('./routes/user');
const players = require('./routes/player-routes');
const notificationRoute = require('./routes/notification');

//allow ports 4200 and 4201 to access the server
app.use(cors({
  origin: ['http://localhost:4200',
    'http://localhost:4201',
    'https://footyverse-frontoffice-s3f6.vercel.app',
    'https://footyverse-backoffice.vercel.app'],
  '*'
}));

app.use(express.json());

app.use('/player', players)
app.use('/training', trainingRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/images', express.static('images'));
app.use('/injury', injuryRoutes);
app.use('/user', userRoute);
app.use('/scouting', scoutingRoutes);
app.use('/calendar', calendarRoutes);
app.use('/notification', notificationRoute);
app.use('/stats', statsRoutes);
app.use('/recovery', recoveryRoutes);



/*****************************************************/
const http = require('http');
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});


io.on('connection', (socket) => {


  socket.on('add-injury', async (injuryId) => {
    try {
      const injury = await Injury.findById(injuryId).populate('player');

      if (!injury) {
        throw new Error('Injury not found');
      }

      io.emit('injuryAdded', injury);
    } catch (error) {
      console.error('Error adding inury', error);
    }
  });


  socket.on('add-training', async (trainingId) => {
    try {
      const training = await Training.findById(trainingId).populate('player');

      if (!training) {
        throw new Error('Training not found');
      }

      io.emit('trainingAdded', training);
    } catch (error) {
      console.error('Error adding training', error);
    }
  });



  socket.on('add-notification', async (notificationId) => {
    try {
      const notification = await Notification.findById(notificationId).populate('player');

      if (!notification) {
        throw new Error('Notification not found');
      }
      io.emit('notificationAdded', notification);
    } catch (error) {
      console.error('Error adding notification', error);
    }
  });



});

/*****************************************************/


app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const message = obj.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: obj.data
  });
});





async function main() {
  try {
    console.log('Connecting to the database...');
    await mongoose.connect(dbConfig.url);
    console.log('Database connected.');

    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });

    server.listen(3002, () => {
      console.log('HTTP server and Socket.io are listening on port 3002');
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

main();






















































//  request = require('request-promise');
/*const cheerio = require('cheerio');


const url = 'https://www.fantasyfootballscout.co.uk/fantasy-football-injuries/';
app.get('/injuriesHistory', async (req, res) => {
    const response = await request(url);
    // Assuming `request` is a function to make HTTP requests

    const $ = cheerio.load(response);
    const injuries = [];

    // Iterate over each row in the table body
    $('table.ffs-ib tbody tr').each((index, element) => {
        const name = $(element).find('td:first-child').text().trim();
        const club = $(element).find('td.team').attr('title');
        const status = $(element).find('td.inj-status span').text().trim();



        const originalReturnDate = $(element).find('td:nth-child(4)').text().trim();
        const parts = originalReturnDate.split('/');
        const returnDate = new Date(parts[2], parts[1], parts[0]);



        const injuryType = $(element).find('td.latest-news strong').text().trim(); // Extract content within <strong> tags
        const latestNews = $(element).find('td.latest-news').text().trim();
        const injuryDateRegex = /on (\d{1,2}\/\d{1,2})/; // Regular expression to match "on dd/mm" format
        const injuryDateMatch = latestNews.match(injuryDateRegex);
        const injuryDateString = injuryDateMatch ? injuryDateMatch[1] : ''; // Extracted injury date string or empty string if not found
        const injuryDateComponents = injuryDateString.split('/');
        let injuryYear = new Date().getFullYear(); // Default to current year

        if (injuryDateComponents.length === 2) {
            const injuryMonth = parseInt(injuryDateComponents[1], 10) - 1; // Month (0-indexed)
            const injuryDay = parseInt(injuryDateComponents[0], 10) + 1; // Day

            if (injuryMonth > new Date().getMonth()) {
                injuryYear -= 1; // Adjust year if injury month is greater than current month
            }

            const injuryDate = new Date(injuryYear, injuryMonth, injuryDay); // Injury date as a Date object
            // const lastUpdated = $(element).find('td:last-child').text().trim();

            // Push extracted data into the injuries array
            injuries.push({ name, club, status, returnDate, injuryType, latestNews, injuryDate });
        }
    });

    // Log the injuries array
    console.log(injuries);
    res.send(injuries);
});


app.get('/predictInjury', async (req, res) => {
  console.log(req.query);

  const response = await axios({
    method: 'get',
    url: `http://192.168.47.241:8001/predict`,

    params: {
      injury_type: req.query.injury_type
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response.data);
  res.send(response.data);
});

*/


const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = 'ec85e69f54a541baa7056e799229254d';

// Route to fetch and return sports headlines from News API
app.get('/sports-headlines', async (req, res) => {

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country: 'gb',
        category: 'sports',
        apiKey: API_KEY
      }
    });

    const responseData = response.data;
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching sports headlines:', error.message);
    res.status(500).json({ error: 'Failed to fetch sports headlines' });
  }
});


app.get('/football-news', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://football-news-aggregator-live.p.rapidapi.com/news/goal',
    headers: {
      'X-RapidAPI-Key': 'a18244075dmsh0328f969f916869p162e92jsn6fc0574737fa',
      'X-RapidAPI-Host': 'football-news-aggregator-live.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching football news:', error);
    res.status(500).json({ error: 'Failed to fetch football news' });
  }
});
