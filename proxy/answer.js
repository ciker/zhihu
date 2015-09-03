var models = require('../models');
var Answer = models.Answer;

exports.newAnswerSave = function (question_id, author_id, author_name, author_avatar, content, callback) {
  var answer = new Answer();
  answer.question_id = question_id;
  answer.author_id = author_id;
  answer.author_name = author_name;
  answer.author_avatar = author_avatar;
  answer.content = content;
  answer.save(callback);
};

exports.findAnswerByQuestionId = function (question_id, callback) {
  Answer.find({ 'question_id': question_id }, callback);
};

// 搜索是否回答过这个问题
// 感觉这样2个id索引后查询，要比判断整个docs里有无author_id快
exports.findIfHasAnswered = function (question_id, author_id, callback) {
  Answer.findOne({ 'question_id': question_id, 'author_id': author_id }, callback);
};

// 增加Up
exports.addUpByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $push:{ 'ups': user_id }, $inc:{ 'ups_number': 1 }}, callback);
};
// 撤销Up
exports.cancelUpByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $pull:{ 'ups': user_id }, $inc:{ 'ups_number': -1 }}, callback);
};

// 增加Down
exports.addDownByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $push:{ 'downs': user_id }}, callback);
};
// 撤销Down
exports.cancelDownByAnswerId = function (answer_id, user_id, callback) {
  Answer.update({ '_id': answer_id }, { $pull:{ 'downs': user_id }}, callback);
};