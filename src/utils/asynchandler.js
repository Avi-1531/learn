const asynchandler = (requesthandler) => {
  return (req, res, next) => {
    Promise.resolve(requesthandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
// or

// const asynchandler=(fn)=>async(req,res,next)=>{
// try {
//    return  await fn(req,res,next)
// } catch (error) {
//    return  res.status(error.code||500).json({
//         success:false,
//         message:error.message
//     })
// }
// }

export { asynchandler };
