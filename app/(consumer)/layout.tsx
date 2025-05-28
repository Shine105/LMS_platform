import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPages } from "@/permissions/general";

export default function ConsumerLayout({
    children,
}: Readonly<{ children: ReactNode }>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

function Navbar() {
    return <header className="flex h-12 shadow bg-background z-10">
        <nav className="flex gap-4 container">
            <Link className="mr-auto text-lg hover:underline flex items-center" href="/">
                Web Dev Simplified
            </Link>
            <Suspense>
                <SignedIn>
                    <AdminLink />
                    <Link className="hover:bg-[hsl(280,75%,50%,0.1)] flex items-center px-2" href="/courses">
                        My Courses
                    </Link>
                    <Link className="hover:bg-[hsl(280,75%,50%,0.1)] flex items-center px-2" href="/purchases">
                        Purchase History
                    </Link>
                    <div className="size-8 self-center">
                        <UserButton appearance={{
                            elements: {
                                userButtonAvatarBox: { width: "100%", height: "100%" }
                            }
                        }}
                        />
                    </div>
                </SignedIn>
            </Suspense>
            <Suspense>
                <SignedOut>
                    <Button className="self-center" asChild>
                        <SignInButton forceRedirectUrl="/post-signin">Sign In</SignInButton>
                    </Button>
                </SignedOut>
            </Suspense>
        </nav>
    </header>
}

async function AdminLink() {
    const user = await getCurrentUser()
    console.log(user.user?.name)
    if (!canAccessAdminPages(user)) return null
    return <Link className="hover:bg-accent flex items-center px-2"
        href="/admin">
        Admin
    </Link>
}