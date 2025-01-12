import { getServerSession } from "next-auth"
import { authoption } from "../api/auth/[...nextauth]/route"

export default async function AboutPage() {
  const session = await getServerSession(authoption)
  console.log(session)
    return (
      <div>
        about
        <div>
        {JSON.stringify(session)}
        </div>
      </div>
    )
  }