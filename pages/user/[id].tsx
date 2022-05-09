import { useRouter } from 'next/router'
import React from 'react'
import UserProfile from '../../components/UserProfile';

const UserProfileWithSurveys = () => {
  const router = useRouter();
  const userId = Array.isArray(router.query.id)
    ? router.query!.id[0]
    : router.query!.id!;

  if (!userId) return <div>no id</div>

  return (
    <UserProfile userId={userId} />
  )
}

export default UserProfileWithSurveys