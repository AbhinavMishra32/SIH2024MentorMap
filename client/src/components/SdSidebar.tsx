import { Brain, CircuitBoardIcon, BrainCircuit, Briefcase, Calendar, ChevronUp, CircuitBoard, HelpingHand, Home, Settings, User, User2, BedDouble, Lightbulb, StarsIcon, GrapeIcon, IndentIncrease, BicepsFlexed, Dumbbell, Search, BlocksIcon, Route, RouteIcon, HardHat, GraduationCap } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useEffect, useState } from "react"
import { api } from "@/services/axios"
import { title } from "process"
import { url } from "inspector"
import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const studentItems = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Find Your Career",
        url: "/careerquiz",
        icon: Search,
    },
    {
        title: "Lessons",
        url: "/learn",
        icon: BlocksIcon,
    },
    {
        title: "Counselling",
        url: "/counselling",
        icon: HelpingHand,
    },
    {
        title: "AI Career Roadmap",
        url: "/careerroadmap",
        icon: RouteIcon,
    },
    {
        title: "Know Your Course",
        url: "/coursefinder",
        icon: GraduationCap,
    },
    {
        title:  "Personality Development",
        url: "/aitraining/interview-prep",
        icon: Dumbbell,
    },
    {
        title: "CareerAI",
        url: "/careerai",
        icon: Lightbulb,
    },
    {
        title: "Exlore Careers",
        url: "/explore",
        icon: Briefcase,
    },
    {
        title: "AI Counsellor",
        url: "/ai",
        icon: StarsIcon,
    },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
]

const counsellorItems = [
    {
        title: "Home",
        url: "/cdashboard",
        icon: Home,
    },
    {
        title: "Counsel Students",
        url: "/counselchat",
        icon: HelpingHand
    },
    {
        title: "Add A Lesson",
        url: "/addlesson",
        icon: IndentIncrease
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar
    }
]

const signOut = () => {
    const cookies = new Cookies();
    console.log(cookies);
    cookies.remove('token');
    cookies.remove('userToken');
    window.location.href = '/';
}

export function SdSidebar() {
    const [user, setUser] = useState<{ username: string; email: string; accountType: string } | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const url = window.location.pathname;


    useEffect(() => {
        try {
            const fetchUser = async () => {
                try {
                    const response = await api.get('/api/user');
                    setUser({ username: response.data.user.username, email: response.data.user.email, accountType: response.data.accountType });
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
                finally {
                    setLoadingUser(false);
                    console.log("User: ", user);
                }
            };
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }, [])
    const navigate = useNavigate();

    const handleSidebarClick = (index: number) => {
        const items = user?.accountType === 'student' ? studentItems : counsellorItems;
        if (index < items.length) {
            navigate(items[index].url);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key >= '1' && event.key <= '9') {
                const index = parseInt(event.key, 10) - 1;
                handleSidebarClick(index);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [user]);

    return (
        <>
            <Sidebar className="rounded-3xl duration-70000 border-2 overflow-hidden shadow-xl hover:shadow-2xl transition-all ease-in">
                <SidebarContent className="bg-[#F5F7F8]">
                    <SidebarGroup>
                        {/* <SidebarGroupLabel>Pages</SidebarGroupLabel> */}
                        <SidebarGroupContent>
                            {!loadingUser && (
                                <SidebarMenu>
                                    {(user?.accountType === 'student' ? studentItems : counsellorItems).map((item, index) => (
                                        <SidebarMenuItem key={item.title} className="px-1">
                                            <SidebarMenuButton asChild isActive={url === item.url || (item.url !== '/' && url.startsWith(item.url) && !url.startsWith(`${item.url}training`))} className="py-5 pl-4 rounded-xl" onClick={() => handleSidebarClick(index)}>
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            )}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> {user?.username}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    {/* <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem> */}
                                    {/* <DropdownMenuItem>
                                        <span>Billing</span>
                                    </DropdownMenuItem> */}
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}
