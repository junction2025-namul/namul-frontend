type SideNavItem = {
    icon: React.ReactNode;
    title: string;
}

const SidenavItem = ({ icon, title }: SideNavItem) => {
    return (
        <div>
            <div className="px-3 py-2 hover:bg-[#E5E5E5] cursor-pointer">
                <div className="flex items-center space-x-3">
                    {icon}
                    <span>{title}</span>
                </div>
            </div>
        </div>
    );
}

export default SidenavItem;