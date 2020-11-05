
//表中“插入”字段，requesttemplates表名
db.requesttemplates.update({}, { $set: { domain: 'test' } }, { multi: 1 })


//表中“删除”字段，requesttemplates表名
db.requesttemplates.update({}, { $unset: { domain: 'test' } }, false, true)


//计数
yield Report.findOneAndUpdate({ _id: Types.ObjectId(reportId) }, { '$inc': { [`calc.restart`]: 1 } }).exec();


//大于/小于等于
  db.getCollection('lims_detections').find({ "samples.8": {$exists:1} })   //大于8
  db.getCollection('lims_detections').find({ "samples.2”: {$exists:0} })  //小于等于2



//查找是否存在这个属性
db.getCollection('report_reports').find({ "payload.test_conclusion.exp_record": { "$exists": true } })


//node查找库
const detectionDoc = yield Detection.findOne({ _id: Types.ObjectId(report.detection) }).exec();
const detection = detectionDoc.toObject();


//网页版百度视频倍数 控制台输入  
videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(1.5);






