import {getUserInfo} from "@/lib/serverActions/user";
import NavBar from "@/components/widgets/AppNavbar/NavBar";


const AppNavbar = async() => {
    // const user = await getUserInfo();
    return (
        <NavBar/>
    )
}

export default AppNavbar
