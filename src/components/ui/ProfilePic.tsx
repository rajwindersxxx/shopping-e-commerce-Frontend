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
        src={image || './defaultUser.jpg'}
        className="h-full w-full object-cover bg-white"
        alt="image"
      />
    </div>
  );
};

export default ProfilePic;
