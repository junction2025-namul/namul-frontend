type SidenavItem = {
    id: number;
    icon: string;
    label: string;
}

interface SidenavListProps {
    sidenavItems: SidenavItem[];
};

const SidenavList: React.FC<SidenavListProps> = ({ sidenavItems }) => {
    return (
        <nav className="">
            {sidenavItems.map((item) => (
                <div
                    key={item.id}
                    className="px-3 py-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-md"
                >
                    {item.icon}
                    <span>{item.label}</span>
                </div>
            ))}
        </nav>
    );
}

export default SidenavList;