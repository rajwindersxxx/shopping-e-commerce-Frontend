interface props {
  image: string | undefined;
  classname?: string;
}
const ProfilePic = ({ image }: props) => {
  return (
    <div
      className={
        "relative row-span-2 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full"
      }
    >
      <img
        src={image || "https://picsum.photos/id/237/200/300"}
        className="h-full w-full object-cover"
        alt="image"
      />
    </div>
  );
};

export default ProfilePic;
