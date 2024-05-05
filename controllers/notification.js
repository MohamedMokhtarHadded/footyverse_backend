const NotificationModel = require("../models/Notification");

async function addNotification(req, res) {
    try {
        const { title, message, date, player, dataId } = req.body;
        const notification = new NotificationModel({
            title,
            message,
            date,
            player,
            dataId,
            status: 'unread'
        });
        const savedNotification = await notification.save();
        return res.json(savedNotification);
    } catch (error) {
        console.error('Error adding notification:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getNotificationById(req, res) {
    try {
        const { id } = req.params;
        const notification = await NotificationModel.findById(id).populate('player');
            
        return res.json(notification);
    } catch (error) {
        console.error('Error getting notification by id:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getNotifications(req, res) {
    try {
        const notifications = await NotificationModel.find().populate('player');
        return res.json(notifications);
    } catch (error) {
        console.error('Error getting notifications:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function setNotificationsAsRead(req, res) {
    try {
        const notifications = await NotificationModel.find({ status: 'unread' });
        
        for (let notification of notifications) {
            notification.status = 'read';
            await notification.save();
        }
         
        return res.json({ message: 'Notifications set as read' });
    } catch (error) {
        console.error('Error setting notifications as read:', error.message);
        return res.status(400).json({ error: error.message });
    }
}


async function deleteNotification(req, res) {
    try {
        const { id } = req.params;
        await NotificationModel.findByIdAndDelete(id);
        return res.json({ message: 'Notification deleted' });
    } catch (error) {
        console.error('Error deleting notification:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function deleteAllNotifications(req, res) {
    try {
        await NotificationModel.deleteMany();
        return res.json({ message: 'All notifications deleted' });
    } catch (error) {
        console.error('Error deleting all notifications:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getNotificationWithTitleInjury(req, res) {
    try {
        const notifications = await NotificationModel.find({ title: 'Injury' }).populate('player');
        return res.json(notifications);
    } catch (error) {
        console.error('Error getting notifications with title Injury:', error.message);
        return res.status(400).json({ error: error.message });
    }
}

async function getNotificationWithTitleTraining(req, res) {
    try {
        const notifications = await NotificationModel.find({ title: 'Training' }).populate('player');
        return res.json(notifications);
    } catch (error) {
        console.error('Error getting notifications with title Training:', error.message);
        return res.status(400).json({ error: error.message });
    }
}



module.exports = {
    addNotification,
    getNotificationById,
    getNotifications,
    setNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
    getNotificationWithTitleInjury,
    getNotificationWithTitleTraining
};