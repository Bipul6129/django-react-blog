import { createContext,useState,useEffect } from "react";

import React from 'react'
import axios from "axios";

const Blogapi =createContext()
export default Blogapi;

export const BlogapiProvider = ({children}) => {

  return (
    <Blogapi.Provider>
        {children}
    </Blogapi.Provider>
  )
}
