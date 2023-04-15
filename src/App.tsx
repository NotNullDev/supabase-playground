import { Session } from '@supabase/supabase-js'
import {
  createBrowserRouter, Link, RouterProvider
} from "react-router-dom"
import { create, useStore } from "zustand"
import { immer } from "zustand/middleware/immer"
import './App.css'
import { supabase } from './lib/supabase'


type UserStoreType = {
  session: Session | null;
}

const userStore = create<UserStoreType>()(
  immer(
    (set,get,state) => {
      supabase.auth.onAuthStateChange((e, s) => {
        console.log(e)
        console.log(s);
        set(store => {
          store.session = s;
        })
      })


      return  {
        session: null
      }
    }
  )
)

type Document = {
  id: string
  name: string
  description: string
}

type AppStoreType = {
  documents: Document[]
}


const appStore = create<AppStoreType>()(immer((set,get,state) => {
  return {
    documents: []
  }
}))

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className='h-screen overflow-hidden'>
      <Header/>
      {children}
    </div>
  )
}

const AuthButton = () => {
  const session = userStore(state => state.session);

  return (<>
  {session && (
        <>
            <button className='px-4 py-2 bg-blue-900 w-min whitespace-nowrap rounded-md active:scale-95'
              onClick={async () => {
                  await supabase.auth.signOut();
              }}
              >Logout</button>
        </>
      )}
      {!session && (
        <>
        <button className='px-4 py-2 hover:bg-slate-900 w-min whitespace-nowrap rounded-md active:scale-95'
        onClick={async () => {
            const user = await supabase.auth.signInWithOAuth({
              provider: 'google'
            })
        }}
        >Login</button>
        </>
      )}
  </>)
}

const Header = () => {

  return (
    <div className='p-4 flex justify-between'>
      <button className='active:scale-95 transition-all'>Supabase playground</button>
      <div className='flex gap-4'>
        <Link to={"/user"}>
          User
        </Link>
        <AuthButton/>
      </div>
    </div>
  )
}


type DocumentViewProps = {
  document: Document
}

const DocumentView = ({document}: DocumentViewProps) => {
  return <div>
    <div>{document.name}</div>
    <div>{document.description}</div>
  </div>
}

const Main = () => {
  const {documents} = useStore(appStore)

  return (
   <Layout>
     <div className='bg-slate-900 text-white h-full overflow-auto flex flex-col items-center p-4'>
      {
        documents.map(doc => {
          return (
            <>
              <DocumentView document={doc} key={doc.id} />
            </>
          )
        })
      }
    </div>
   </Layout>
  )
}


function App() {
  return (
    <div className="h-screen bg-slate-800 text-slate-200 overflow-hidden">
      <RouterProvider router={router} />
    </div>
  )
}

const UserPage = () => {
  return (<>
    <Layout>
      <div>User page</div>
    </Layout>
  </>)
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "/user",
    element: <UserPage/>
  }
]);


export default App

