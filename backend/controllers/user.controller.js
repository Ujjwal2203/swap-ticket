import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import jwt from "jsonwebtoken";

const generateRefreshAndAccessTokens = async(userId) =>{
  try {
    const user = await User.findById(userId)
    const accessToken  = user.generateaccesstoken()
    const refreshToken = user.generaterefreshtoken()
    user.refreshToken = refreshToken
    await user.save({ValidateBeforeSave : false})

    return {accessToken , refreshToken}

  } catch (error) {
    throw new apiError(500 , "generation of refersh and access token failed ")
  }

}


const registeredUser = asyncHandler( async(req,res)=>{
  const {userName, email, fullName, password , phoneNumber } = req.body


  if([fullName,userName,password,email].some((fields)=>fields?.trim() ==="")){
    throw new apiError(400,"all fields are required")
  }


  const existedUser = await User.findOne({
    $or : [{userName},{email}] 
  })
  if(existedUser){
    throw new apiError(409, "user with email or username already exists")
  }

  const user = await User.create({
    fullName,
    email,
    password,
    userName: userName.toLowerCase(),
    phoneNumber
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
  if(!createdUser){
    throw new apiError(500,"server error user not registered ")
  }
  // return response 
  return res.status(201).json(
    new apiResponse(200 , createdUser ,"user successfully registered")
  )

}) 

const loginUser = asyncHandler(async(req,res)=>{

  const {userName , password , email , phoneNumber} = req.body
  if(!(email||userName)){
    throw new apiError(400 , "email or username is required")
  }

  const user = await User.findOne({
    $or: [{userName} , {email}]
  })

  if (!user) {
    throw new apiError(404 , " user not found please register ")
  }

  const isPasswordValid =  await user.ispasswordcorrect(password)
  if (!isPasswordValid)  {
    throw new apiError(401, "password is incorrect try again!!")
  }

  const {refreshToken, accessToken } = await generateRefreshAndAccessTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  // cookie 
  const options = {
    httpOnly: true,  
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken , options)
  .cookie("refreshToken", refreshToken , options)
  .json(
    new apiResponse(
      // status code 
      200,
      // data
      {
        user: loggedInUser , refreshToken, accessToken
    },
    "user logged in successfully"
  )
  )

})

const logoutUser = asyncHandler(async(req,res)=>{

  await  User.findByIdAndUpdate(  
    req.user._id,
    {
      $set : {
        refreshToken: undefined
      }
    },
    {
      new: true 
    }
  )
  const options = {
    httpOnly: true, 
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken" , options)
  .clearCookie("refreshToken" , options)
  .json(new apiResponse(200 ,{} ,"User logged out successfully"))

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
  // we are making this to refresh the access token after its expiry so user don't have to relogin 
  // we can do this by checking refresh token from cookies with the saved refresh token from database and if match we can generate a new access token

  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken) {
    throw new apiError(401 , "unauthorized request ")
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken ,
      process.env.REFRESH_TOKEN_SECRET
    )
    const user = await User.findById(decodedToken?._id)
  
    if (!user) {
      throw new apiError(408, "Invalid refresh Token")
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new apiError(408, "refresh Token expired")
    }
  
    // after all the checks generate user a new token 
  
    const {accessToken  , newRefreshToken} = await generateRefreshAndAccessTokens(user._id)
  
    // we will send response in cookie so options is needed we can also declare them globally
    const options = {
      httponly: true,
      secure: true
    }
    return res
    .status(200)
    .cookie("refreshToken" , newRefreshToken , options)
    .cookie("accessToken" , accessToken , options)
    .json(
      new apiResponse(
        200,
        {accessToken , refreshToken: newRefreshToken},
        "access token refreshed successfully"
      )
    )
  } catch (error) {
    throw new apiError(401 , "access token generation failed")
  }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
  const {oldPassword , newPassword} = req.body
  const user = await User.findById(req.user._id)
  const isPasswordCorrect  =  await user.ispasswordcorrect(oldPassword)
  if (!isPasswordCorrect) {
    throw new apiError(400, "invalid old password")
  }
  user.password = newPassword
  await user.save({ValidateBeforeSave: false})

  return res
  .status(200)
  .json(new apiResponse(200,{}, "Password changed successfull"))
})

export {registeredUser , loginUser , logoutUser ,refreshAccessToken ,changeCurrentPassword}