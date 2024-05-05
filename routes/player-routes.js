const express = require('express');
const router = express.Router();

const Player = require('../models/Player');

const multer = require('multer');

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const stats = require('../controllers/stats');




// insert images using multer and save the file path to the database
// Define storage for the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // store files in 'images' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // generate unique filename
  },
});


const upload = multer({ storage: storage });

router.get('/get-players', async (req, res) => {
  try {
    const players = await Player.find();

    res.status(200).json({ players });
  } catch (error) {
    console.error('Error getting players:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// router.post('/add', upload.single('avatar'), async (req, res) => {
//   try {
//     console.log('req.body:', req.body);
//     const playerData = req.body;

//     if (req.file && req.file.path) {
//       const inputPath = req.file.path;
//       const formData = new FormData();
//       formData.append('size', 'auto');
//       formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

//       const response = await axios({
//         method: 'post',
//         url: 'https://api.remove.bg/v1.0/removebg',
//         data: formData,
//         responseType: 'arraybuffer',
//         headers: {
//           ...formData.getHeaders(),
//           'X-Api-Key': 'TCzwMVkjQ78RKyMUAD5xGhAS',
//         },
//         encoding: null
//       });

//       if (response.status != 200) {
//         console.error('Error:', response.status, response.statusText);
//         return res.status(500).json({ error: 'Error removing background' });
//       }

//       const outputPath = 'images/no-bg-' + Date.now() + '.png';
//       fs.writeFileSync(outputPath, response.data);

//       playerData.avatar = outputPath;
//     }

//     const newPlayer = new Player(playerData);

//     await newPlayer.save();

//     res.status(201).json({ message: 'Player saved successfully', player: newPlayer });
//   } catch (error) {
//     console.error('Error saving tournament:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


router.post('/add', upload.single('avatar'), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const playerData = req.body;

    if (req.file && req.file.path) {
      playerData.avatar = req.file.path;
    }

    const newPlayer = new Player(playerData);

    await newPlayer.save();

    res.status(201).json({ message: 'Player saved successfully', player: newPlayer });
  } catch (error) {
    console.error('Error saving player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/update/:id', upload.single('avatar'), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    let playerData = req.body;

    if (req.file && req.file.path) {
      const inputPath = req.file.path;
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': 'WVMfKJeYk1mi7cCxmgS8EXFn',
        },
        encoding: null
      });

      if (response.status != 200) {
        console.error('Error:', response.status, response.statusText);
        return res.status(500).json({ error: 'Error removing background' });
      }

      const outputPath = 'images/no-bg-' + Date.now() + '.png';
      fs.writeFileSync(outputPath, response.data);

      playerData.avatar = outputPath;
    }

    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, playerData, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({ message: 'Player updated successfully', player: updatedPlayer });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id);

    if (!deletedPlayer) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/get-player/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({ player });
  } catch (error) {
    console.error('Error getting player:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



/*
async function getPlayersStatsByPlayerId(req, res) {
    try {
        const { player } = req.params;
        const stat = await playersStatsModel.findOne({ player });
        return res.json(stat);
    } catch (error) {
        console.error('Error getting stat by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}
*/

router.get('/getPlayersLowPerformance', async (req, res) => {
    try {
      
    const players = await Player.find();

    for (const player of players) {

      stats.getPlayersStatsByPlayerId(player._id, function (err, playerStats) {
        if (err) {
          console.error('Error getting player stats:', err);
          return;
        }

        if (player.position == "CB" || player.position == "LB" || player.position == "RB") {
          if (playerStats.defending < 60 || playerStats.tackling < 60) {
            console.log("Player " + player.firstName + " " + player.lastname + " needs to improve his defending and tackling");
          }
        } else if (player.position == "CM" || player.position == "CDM" || player.position == "CAM" || player.position == "RM" || player.position == "LM") {
          if (playerStats.tecnical < 60 || playerStats.creativity < 60) {
            console.log("Player " + player.firstName + " " + player.lastname + " needs to improve his tecnical and creativity");
          }
        } 
        
        else if (player.position == "ST" || player.position == "CF" || player.position == "LW" || player.position == "RW") {
          if (playerStats.attacking < 60) {
            console.log("Player " + player.firstName + " " + player.lastname + " needs to improve his attacking");
          }
        } 
        else {
          console.log("Player " + player.firstName + " " + player.lastname + " is a goalkeeper");
        }
      });
    }

    res.status(200).json({ players });
  } catch (error) {
    console.error('Error getting players:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});


    

module.exports = router;


