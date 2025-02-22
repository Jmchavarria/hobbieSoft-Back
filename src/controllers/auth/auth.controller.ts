import { ExpressController } from "../../types/expressController";
import { accessServices } from "../../services";


export const login: ExpressController = async (req, res, next) => {
  try {
    const { email, token } = req.body;

    const response = await accessServices.login(email)

    res.cookie("routineSofToken", response.info.accessToken,

      // { httpOnly: true, secure: true, maxAge: 10000, sameSite: "lax" }
    );

    // res.header('authorization', response.info.accessToken).json({message: 'Usuario autenticado'})
    res.status(200).json(response);
  } catch (error: any) {
    next(error)
  }
};



export const logout: ExpressController = async (req, res, next) => {
  try {
    res.clearCookie('routineSofToken')
    res.status(200).json(await accessServices.logout())
  } catch (error) {
    console.error('Error to logout')
    next(error)
  }

}

export const getUserInfo: ExpressController = async (req, res, next) => {
  try {
    const { id } = req.params;
   
    
    res.status(200).json(await accessServices.getUserInfo(id));
  } catch (error) {
    console.error("Error to get user:", error);
    next(error)
  }
};
