import NavBar from "@/components/widgets/AppNavbar/NavBar";
import {getConfiguration} from "@/lib/serverActions/auth";


const AppNavbar = async() => {
    const config = await getConfiguration();
    return (
        <NavBar config={config}/>
    )
}

export default AppNavbar
