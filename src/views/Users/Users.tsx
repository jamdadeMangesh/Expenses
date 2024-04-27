import React, { useEffect, useState } from "react";
import "./Users.scss";
import { useHeaderContext } from "../../context/HeaderContext";
import { authentication } from "../../shared/firebase";
import { getAllUsers } from "../../shared/constant";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export const Users = () => {
    const { setTitle, setShowBackArrow, setShowAddNewButton } =
        useHeaderContext();
    const [usersData, setUsersData] = useState([]);
    const [usersLoading, setUsersLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                navigate("/users");
            } else {
                navigate("/login");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setTitle("All Users");
        setShowBackArrow(true);
        setShowAddNewButton(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllUsersInfo();
    }, []);
    const getAllUsersInfo = async () => {
        const res: any = [];
        getAllUsers().then((result) => {
            setUsersLoading(true);
            result.forEach((item) => {
                res.push({
                    id: item.id,
                    ...item.data(),
                });
            });

            setUsersData(res);
            setUsersLoading(false);
        });
    };

    const onUserClick = (data: any) => {
        navigate("/userDetails/" + data?.id, { state: { data, id: data?.id } });
    };

    return (
        <>
            <div className="loginWrapper" data-testid="loginWrapper">
                {usersLoading ? (
                    <Loader />
                ) : (
                    usersData.sort((a: any, b: any) => a.role.localeCompare(b.role)).map((item: any) => (
                        <div
                            className="usersList"
                            key={item.id}
                            onClick={() => onUserClick(item)}
                        >
                            <div className="usersList__grid">
                                <div className="usersList__name">
                                    <div className="usersList__name-grid">
                                        {item?.name}{" "}
                                        {item?.canAccess ? (
                                            <FaCircleCheck style={{ color: "#2D864B" }} />
                                        ) : (
                                            <FaCircleXmark style={{ color: "#d82c0d" }} />
                                        )}
                                    </div>
                                    <div
                                        className={`usersList__role ${item?.role === "admin"
                                            ? "usersList__role-admin"
                                            : "usersList__role-user"
                                            }`}
                                    >
                                        {item?.role === "admin" ? "Admin" : "User"}
                                    </div>
                                </div>
                                <div className="usersList__mobile">{item?.email}</div>
                                <div className="usersList__mobile d-flex justify-content-between">
                                    <div>{item?.mobileNumber} </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
