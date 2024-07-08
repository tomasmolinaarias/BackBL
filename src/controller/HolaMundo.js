import dotenv from 'dotenv';

dotenv.config()

const HolaMundo= {
    saludos: async(req, res)=>{
        try {
            console.log("Te equivocaste de api")
            return res.send("Hola")
        } catch (error) {
            console.error("Error ", error);
            res.status(500).json({
              error: "Error"
            });
        }

    },
};
export default HolaMundo;