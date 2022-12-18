const HttpError = require('../models/http-error');
const Interlude = require('../models/interludeModel');
const User = require('../models/userModel')
const mongoose = require('mongoose');

const getInterlude = async (req, res, next) => {
  let interlude;
  try {
    interlude = await Interlude.findById(req.params.iid)
  } catch (err) {
    const error = new HttpError(
      'Fetching interlude failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ interlude: interlude.toObject() });
};

const createInterlude = async (req, res, next)=>{
  const {partyName, creator, title, userId} = req.body
  console.log('partyName', partyName)
  const newInterlude = new Interlude({partyName, title, creator})
  console.log('interlude', newInterlude)
  let user;
try {
  console.log('userId', userId)
  user = await User.findById(userId);

} catch (err) {
  const error = new HttpError(
    'error finding user.',
    500
  );
  return next(error);
}

if (!user) {
  const error = new HttpError('Could not find user for provided id.', 404);
  return next(error);
}

try {
  //await newInterlude.save()
  const sess = await mongoose.startSession();
  sess.startTransaction();
  console.log('interlude', newInterlude)
  await newInterlude.save({ session: sess });
  const interludeInfo = {
    id: newInterlude._id,
    title: newInterlude.title,
    partyName: newInterlude.partyName
  }
  console.log('interlude info', interludeInfo)
  
  user.userDoc.createdInterludes.push(interludeInfo)
  
  console.log('the new user', user)
  await user.save({ session: sess });
  await sess.commitTransaction();
} catch (err) {
  const error = new HttpError(
    'Creating session failed, please try again.',
    500
  )
  return next(error);
}

res.status(201).json({ interlude: newInterlude.toObject({getters:true}), userDoc: user.userDoc});

}

const updateField = async (req, res, next) =>{
  const {field, info} = req.body
  const iid = req.params.iid
  let interlude
  try{
    interlude= await Interlude.findById(iid)
    interlude[field] = info
    await interlude.save()
  }catch{
    const error = new HttpError(
      'failed to update interlude',
      500
    )
    return next(error);
  }
  if (!interlude) {
    const error = new HttpError('Could not find interlude for provided id.', 404);
    return next(error);
  }

  res.status(201).json({interlude: interlude.toObject()})
}

const createAct = async (req, res, next) =>{
  const {act} = req.body
  const iid = req.params.iid
  let interlude
  try{
    interlude= await Interlude.findById(iid)
    interlude.acts.push(act)
    await interlude.save()
  }catch{
    const error = new HttpError(
      'failed to update interlude',
      500
    )
    return next(error);
  }
  if (!interlude) {
    const error = new HttpError('Could not find interlude for provided id.', 404);
    return next(error);
  }

  res.status(201).json({interlude: interlude.toObject()})
}

const updateAct = async (req, res, next) =>{
  const {act, index} = req.body
  const iid = req.params.iid
  let interlude
  try{
    interlude= await Interlude.findById(iid)
    interlude.acts[index] = act
    await interlude.save()
  }catch{
    const error = new HttpError(
      'failed to update interlude',
      500
    )
    return next(error);
  }
  if (!interlude) {
    const error = new HttpError('Could not find interlude for provided id.', 404);
    return next(error);
  }

  res.status(201).json({interlude: interlude.toObject()})
}







exports.createInterlude = createInterlude;
exports.updateField = updateField;
exports.createAct = createAct;
exports.updateAct = updateAct;
exports.getInterlude = getInterlude;