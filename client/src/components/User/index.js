import React from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashBoard = ({user}) => {
        return (
            <UserLayout>
                <div>
                    <div className="user_nfo_panel">
                        <h1>User Infomation</h1>
                        <div>
                            <span>{user.userData.name}</span>
                            <span>{user.userData.lastname}</span>
                            <span>{user.userData.email}</span>
                        </div>
                        <MyButton 
                            type="default"
                            title="Edit Account Info"
                            linkTo="/user/user_profile"
                        />
                    </div>

                    {
                        user.userData.history ? 
                        <div className="user_nfo_panel">
                            <h1>History Purchases</h1>
                            <div className="user_product_block_wrapper">
                                <UserHistoryBlock
                                    products={user.userData.history}
                                />
                            </div>
                            </div>
                        :null
                    }

                    
                </div>
            </UserLayout>
        );
}

export default UserDashBoard;