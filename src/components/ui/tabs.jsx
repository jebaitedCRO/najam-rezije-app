export function Tabs({ children, defaultValue, onValueChange, className = "" }) {
  const [active, setActive] = React.useState(defaultValue);

  const changeTab = (value) => {
    setActive(value);
    onValueChange && onValueChange(value);
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (child.type.displayName === "TabsList") {
      return React.cloneElement(child, { active, changeTab });
    }
    if (child.type.displayName === "TabsContent") {
      return React.cloneElement(child, { active });
    }
    return child;
  });

  return <div className={className}>{clonedChildren}</div>;
}

export function TabsList({ children, active, changeTab }) {
  return (
    <div className="flex gap-2 mb-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { active, changeTab })
      )}
    </div>
  );
}
TabsList.displayName = "TabsList";

export function TabsTrigger({ value, children, active, changeTab }) {
  const isActive = active === value;
  return (
    <button
      onClick={() => changeTab(value)}
      className={`px-4 py-2 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, active, children }) {
  return value === active ? <div>{children}</div> : null;
}
TabsContent.displayName = "TabsContent";