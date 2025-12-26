'use client'

import React, { useState } from "react";
import { UserSession, User} from '@/app/data/types';
import { update } from './actions';

// fetch natin yung user information then display sa page, then lagay tayo ng parang button na maglalabas ng input thingy para maedit na yung page ganun

const CreateSettingsPage: React.FC = () => {
    const [user, setUser] = useState<UserSession | null>(null);
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [username, setUsername] = useState<String>("");
    const [id, setId] = useState<Number>();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      update(id, username);
    };
    React.useEffect(() => {
          const fetchUser = async (): Promise<void> => {
              try {
                  const response = await fetch('/api/session');
                  if (response.ok) {
                      const data = await response.json();
                      setUser(data.user || null);
                      setId(data.user.user_id || null)
                      
                  }
              } catch (err) {
                  console.error('Failed to fetch user:', err);
              }
          };
          fetchUser();
      }, []);

    React.useEffect(() => {
      if (!user?.username) return;

      const fetchUserInfo = async (): Promise<void> => {
        try {
          const response = await fetch(`/api/users/${user?.username}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data.data.user);
            setUserInfo(data.data.user || null);
          }
        } catch (err) {
          console.error('Failed to fetch user info', err);
        }
      };
      
      fetchUserInfo();
    }, [user]);

    
      
  return (
    <>
      <div>Name: {userInfo?.first_name} {userInfo?.last_name}</div>
      <div>Username: {userInfo?.username}</div>
      <div>Email: {userInfo?.email}</div>
      <div>Show password: {userInfo?.password}</div>

      <form action={update}>
        <input type="hidden" name="id" value={id ?? ""}></input>
        <div className="row">
          <input id="name" placeholder="Change name"></input><button type="submit">Change</button>
        </div>
        <div className="row">
          <input id="username" placeholder="Change username"></input><button>Change</button>
        </div>
        <div className="row">
          <input id="email" placeholder="Change email"></input><button>Change</button>
        </div>
        <div className="row">
          <input id="password" placeholder="Change password"></input><button>Change</button>
        </div>
      </form>
    </>
    
  );
}

export default CreateSettingsPage;