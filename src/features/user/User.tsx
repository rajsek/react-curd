import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {     userSelectors, fetchUserAsync, selectCategoryEntity } from './userSlice';

interface  userProps {
  id: number 
}

export function User({id}: userProps) {
  const user = useSelector(selectCategoryEntity(id));
  // useEffect(() => {
  //   if(!user || !user.name)
  //     dispatch(fetchUserAsync(id))
  // },[id,user?.name])
  // const dispatch = useAppDispatch();

  return (
    <div>
           { user?.name || id }

  
    </div>
  );
}
