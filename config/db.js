const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/P6Z3F2', {useNewUrlParser: true}, { useUnifiedTopology: true });

module.exports = mongoose;