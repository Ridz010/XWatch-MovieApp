import { Link, useLocation } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlineRise, AiOutlineCalendar } from 'react-icons/ai';
import { HiMenuAlt2 } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeInOut"
            },
        }),
    };

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    return (
        <>
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 p-2 text-black rounded-md"
                >
                    <HiMenuAlt2 size={24} />
                </button>
            )}

            <AnimatePresence>
                {(!isMobile || isOpen) && (
                    <motion.aside
                        ref={sidebarRef}
                        className="fixed w-[250px] h-screen bg-white text-[#6100B1] p-6 flex flex-col shadow-lg z-50 left-0 top-0 overflow-y-auto"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="text-xl font-bold mb-8 flex items-center text-[#6100B1]"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                        >
                            <FaCameraRetro className="mr-2" /> XWATCH
                        </motion.div>
                        <motion.hr
                            className="my-6 border-[#6100B1]"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                        />
                        <div className="flex-grow">
                            <motion.h3
                                className="text-sm font-semibold text-purple-300 mb-2 uppercase"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                            >
                                Menu
                            </motion.h3>
                            <motion.ul className="space-y-4">
                                {[
                                    { path: '/', icon: <IoHomeOutline className="mr-3" />, label: 'Home' },
                                    { path: '/favourites', icon: <MdFavoriteBorder className="mr-3" />, label: 'Favourites' },
                                    { path: '/trending', icon: <AiOutlineRise className="mr-3" />, label: 'Trending' },
                                    { path: '/coming-soon', icon: <AiOutlineCalendar className="mr-3" />, label: 'Coming Soon' },
                                ].map((item, i) => (
                                    <motion.li
                                        key={item.path}
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        variants={itemVariants}
                                    >
                                        <Link
                                            to={item.path}
                                            className={`flex items-center p-2 rounded-md transition-transform duration-300 transform 
                                            ${location.pathname === item.path
                                                    ? 'bg-purple-200 text-purple-900 scale-105 shadow-md'
                                                    : 'text-[#6100B1] hover:bg-purple-100 hover:text-purple-900 hover:scale-105'}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.icon} {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

export default Sidebar;
