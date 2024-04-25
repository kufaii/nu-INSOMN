export default function UserCard({ user }) {
    console.log(user, "user nihhhhhhhhhhhhhhhhhhhhh");
    return (
        <>
            <div className="text-white border border-blue-700 rounded-lg">
                <h1 className="pl-2">{user}</h1>
            </div>
        </>
    );
}
