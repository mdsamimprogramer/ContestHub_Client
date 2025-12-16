import React from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';
import { FaHeadset, FaMotorcycle } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { GoProjectSymlink } from "react-icons/go";
import { MdGroupAdd, MdOutlineAddTask } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { TbHomeHand } from 'react-icons/tb';
import { Link, NavLink, Outlet } from 'react-router';
import { IoIosPersonAdd } from "react-icons/io";
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { role } = useRole()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar shadow-md w-full bg-base-300 sticky top-0 z-50">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <BsArrowLeftRight size={20} />
                    </label>
                    <div className="px-4 text-xl font-bold">Contest <span className='font-normal text-red-600'>Hub</span> Dashboard</div>
                </nav>

                {/* Page content here */}
                <Outlet></Outlet>
            </div>

            <div className="drawer-side shadow-md is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full space-y-4 grow">
                        {/* List item */}
                        <li>
                            <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                <TbHomeHand size={20} color='red' />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>

                        {/* creator Dashboard layouts */}
                        {
                            role === 'creator' && <>
                                <li>
                                    <NavLink to='/dashboard/add-contest' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Contest">
                                        <IoIosPersonAdd size={20} />
                                        <span className="is-drawer-close:hidden">Add Contest</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/my-contest' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Contest">
                                        <GoProjectSymlink size={20} />
                                        <span className="is-drawer-close:hidden">My Contest</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Submitted Tasks & Declare Winner">
                                        <MdOutlineAddTask size={20} />
                                        <span className="is-drawer-close:hidden">Submitted Tasks</span>
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* user Dashboard layouts */}
                        {
                            role === 'user' && <>
                                <li>
                                    <NavLink to='/dashboard/participated' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Participated Contests">
                                        <MdGroupAdd size={20} />
                                        <span className="is-drawer-close:hidden">My Participated Contests</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/winning' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Winning Contests">
                                        <GiPodiumWinner size={20} />
                                        <span className="is-drawer-close:hidden">My Winning Contests</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/profile' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                        <CgProfile size={20} />
                                        <span className="is-drawer-close:hidden">My Profile</span>
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* admin Dashboard route */}
                        {
                            role === 'admin' && <>
                                <li>
                                    <NavLink to='/dashboard/admin' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                        <FaMotorcycle size={20} />
                                        <span className="is-drawer-close:hidden">Approve-riders</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/admin/contests' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                        <FaMotorcycle size={20} />
                                        <span className="is-drawer-close:hidden">Approve-riders</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/admin/users' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                        <FaMotorcycle size={20} />
                                        <span className="is-drawer-close:hidden">Approve-riders</span>
                                    </NavLink>
                                </li>
                            </>
                        }


                        {/* admin only links */}
                        {/* {role === 'admin' && <>
                            <li>
                                <NavLink to='/dashboard/approve-riders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                    <FaMotorcycle size={18} />
                                    <span className="is-drawer-close:hidden">Approve-riders</span>
                                </NavLink>
                            </li>
                        </>} */}

                        {/* <li>
                            <NavLink to='/dashboard/assign-riders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Riders">
                                <RiEBikeFill size={18} />
                                <span className="is-drawer-close:hidden">Assign-riders</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/dashboard/users-management' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users Manegments">
                                <FaUser size={18} />
                                <span className="is-drawer-close:hidden">Approve-riders</span>
                            </NavLink>
                        </li> */}

                        <li>
                            <NavLink to='/support-settings' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Support & Settings">
                                <FaHeadset size={20} />
                                <span className="is-drawer-close:hidden">Support & Settings</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;