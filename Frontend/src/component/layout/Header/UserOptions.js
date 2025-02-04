import "./Header.css";
import { useAlert } from 'react-alert';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import PersonIcon from "@material-ui/icons/Person";
import { logout } from '../../../actions/userAction';
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useSelector, useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
            icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />,
            name: `Cart(${cartItems.length})`, func: cart
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]

    if (user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
    };

    function dashboard() {
        navigate(`/admin/dashboard`);
    };
    function orders() {
        navigate(`/orders`);
    };
    function account() {
        navigate(`/account`);
    };
    function cart() {
        navigate(`/cart`);
    };
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    };

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className='speedDial'
                icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Profile"
                />}
            >
                {
                    options.map((item) => (
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            onClick={item.func}
                            tooltipOpen={window.innerWidth <= 600 ? true : false}
                        />
                    ))
                }
            </SpeedDial>
        </>
    );
};
export default UserOptions;