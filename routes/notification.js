const router = require('express').Router();
const {
    addNotification,
    getNotificationById,
    getNotifications,
    setNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
    getNotificationWithTitleInjury,
    getNotificationWithTitleTraining
} = require('../controllers/notification');

router.post('/add', addNotification);
router.get('/', getNotifications);
router.get('/:id', getNotificationById);
router.post('/set-as-read', setNotificationsAsRead);
router.delete('/:id', deleteNotification);
router.delete('/', deleteAllNotifications);
router.get('/title/injury', getNotificationWithTitleInjury);
router.get('/title/training', getNotificationWithTitleTraining);


module.exports = router;