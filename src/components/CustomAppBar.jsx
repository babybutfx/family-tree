import { AppBar, Toolbar, Typography } from "@mui/material"


const CustomAppBar = ({ title }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default CustomAppBar