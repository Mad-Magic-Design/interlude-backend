const HttpError = require('../models/http-error');
const Interlude = require('../models/interludeModel');

const getInterlude = async (req, res, next) => {
  let interlude;
  try {
    interlude = await Interlude.findById(req.params.uid)
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
  const {partyName, creator, userId} = req.body
  const newInterlude = new Interlude({partyName, creator, })

  let user;
try {
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
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await newInterlude.save({ session: sess });
  user.userDoc.createdInterludes.push(newInterlude)
  await user.save({ session: sess });
  await sess.commitTransaction();
} catch (err) {
  const error = new HttpError(
    'Creating session failed, please try again.',
    500
  )
  return next(error);
}

res.status(201).json({ interlude: interlude.toObject({getters:true}) });

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