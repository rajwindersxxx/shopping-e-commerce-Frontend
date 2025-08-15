import CartButton from "./ui/CartButton";

const Navigation = () => {
  return (
    <nav className="flex-1">
      <ul className="flex flex-1 items-center justify-end gap-4">
        <CartButton />
      </ul>
    </nav>
  );
};

export default Navigation;
