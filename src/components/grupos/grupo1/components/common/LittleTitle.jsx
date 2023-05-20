import { Box, Typography , Divider} from "@mui/material";

const LittleTitle= (props) => {

    const {title, icon}= props;

    return (
    <> 
        <Box sx={{display:'flex', alignItems:'center',marginBottom:1}}>
                {icon}
                <Typography variant="h5" color={'darkgray'} >{title}</Typography>
              </Box>
              <Divider sx={{ color: "silver", mb: "10px" }} />
    </>
    )
}

export default LittleTitle;