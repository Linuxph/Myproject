import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "/LOGO.png";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, Menu, User } from "lucide-react"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"
import { Badge } from "../../ui/Badge"
import { Card, CardContent } from "../../ui/Card"


const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      localStorage.clear();
      navigate('/login');
  } catch (error) {
      toast.error('Failed to log out');
  }
}
const [searchQuery, setSearchQuery] = useState("")
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggle, settoggle] = useState(false);
  
  return (
    <div>
      <header className="fixed top-0 w-full z-[50] bg-black/80 backdrop-blur-md border-b border-gray-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-red-600">
                MOVIEtIME
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="hover:text-red-500 transition-colors">
                  Home
                </Link>
                <Link href="/movies" className="hover:text-red-500 transition-colors">
                  Movies
                </Link>
                {/* <Link href="/theaters" className="hover:text-red-500 transition-colors">
                  Theaters
                </Link> */}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex relative">
                {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-900 border-gray-700 text-black placeholder-gray-400 w-64"
                />
              </div>
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* //bg-[#0F67B1]/40 */}
      {/* <nav className="xl:hidden md:hidden lg:hidden gap-5 items-center p-2 bg-black backdrop-sepia-0 flex justify-between relative z-[999]">
        <div>
          <Link to="/">
            <img src={Img} alt="LOGO" className="h-[4vh] " />
          </Link>
        </div>
        <div>
          <span
            className={`material-symbols-outlined ${
              toggle && `hidden`
            } cursor-pointer bg-white`}
            onClick={() => {
              setmenu(true), settoggle(true);
            }}
          >
            menu
          </span>
        </div>
        <span
          className={`material-symbols-outlined ${
            toggle ? `block` : `hidden`
          } cursor-pointer bg-white`}
          onClick={() => {
            setmenu(false), settoggle(false);
          }}
        >
          close
        </span>
        <div
          className={`menu ${
            menu ? `block` : "hidden"
          } transition ease-in-out delay-150 z-[999] absolute bg-[#000000] m-1 p-2 rounded-3xl right-[0%] top-[95%] w-full h-[28vh]  border-2 border-black` }
        >
          <div className="p-5 active:bg-blue-900 rounded-3xl border-black bg-white border-2">
            <Link to="/latest">LATEST</Link>
          </div>
          <div className="p-5 active:bg-blue-500 rounded-3xl border-black border-2 bg-white">
            <Link to="/rated">RATED</Link>
          </div>
          <div className="p-5 active:bg-red-500 rounded-3xl border-black border-2 bg-white">
            <button onClick={()=>{logoutHandler()}}>LOGOUT</button>
          </div>
        </div>
        {/* { logout && 
        <div
          className={`bg-[#0F67B1] rounded-md p-1 font-bold text-white absolute top-[1600%] w-full  xl:hidden md:hidden lg:hidden flex justify-center`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setlogout(false);
              setusertoken("");
              navigate('/login');
            }}
            style={{ backgroundColor: "red", borderRadius: "8px", padding: 2 }}
          >
            Logout
          </button>
        </div> } 
      </nav> 
      */}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden text-white">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link href="/" className="text-xl hover:text-red-500 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="text-xl hover:text-red-500 transition-colors">
              Movies
            </Link>
            {/* <Link href="/theaters" className="text-xl hover:text-red-500 transition-colors">
              Theaters
            </Link> */}
            <div className="relative">
              {/* <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 " /> */}
              <Input
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-black placeholder-gray-400 w-64"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;

//NEW CODE


// import * as React from "react"
// import * as MenubarPrimitive from "@radix-ui/react-menubar"
// import { Check, ChevronRight, Circle } from "lucide-react"

// // import {   } from "@/lib/utils"

// const MenubarMenu = MenubarPrimitive.Menu
// const MenubarGroup = MenubarPrimitive.Group
// const MenubarPortal = MenubarPrimitive.Portal
// const MenubarSub = MenubarPrimitive.Sub
// const MenubarRadioGroup = MenubarPrimitive.RadioGroup

// const Menubar = React.forwardRef(({ className, ...props }, ref) => (
//   <MenubarPrimitive.Root
//     ref={ref}
//     className={ (
//       "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
//       className
//     )}
//     {...props}
//   />
// ))
// Menubar.displayName = MenubarPrimitive.Root.displayName

// const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
//   <MenubarPrimitive.Trigger
//     ref={ref}
//     className={ (
//       "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
//       className
//     )}
//     {...props}
//   />
// ))
// MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

// const MenubarSubTrigger = React.forwardRef(
//   ({ className, inset, children, ...props }, ref) => (
//     <MenubarPrimitive.SubTrigger
//       ref={ref}
//       className={ (
//         "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
//         inset && "pl-8",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <ChevronRight className="ml-auto h-4 w-4" />
//     </MenubarPrimitive.SubTrigger>
//   )
// )
// MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

// const MenubarSubContent = React.forwardRef(({ className, ...props }, ref) => (
//   <MenubarPrimitive.SubContent
//     ref={ref}
//     className={ (
//       "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//       className
//     )}
//     {...props}
//   />
// ))
// MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

// const MenubarContent = React.forwardRef(
//   ({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
//     <MenubarPrimitive.Portal>
//       <MenubarPrimitive.Content
//         ref={ref}
//         align={align}
//         alignOffset={alignOffset}
//         sideOffset={sideOffset}
//         className={ (
//           "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//           className
//         )}
//         {...props}
//       />
//     </MenubarPrimitive.Portal>
//   )
// )
// MenubarContent.displayName = MenubarPrimitive.Content.displayName

// const MenubarItem = React.forwardRef(({ className, inset, ...props }, ref) => (
//   <MenubarPrimitive.Item
//     ref={ref}
//     className={ (
//       "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
//       inset && "pl-8",
//       className
//     )}
//     {...props}
//   />
// ))
// MenubarItem.displayName = MenubarPrimitive.Item.displayName

// const MenubarCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
//   <MenubarPrimitive.CheckboxItem
//     ref={ref}
//     className={ (
//       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
//       className
//     )}
//     checked={checked}
//     {...props}
//   >
//     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//       <MenubarPrimitive.ItemIndicator>
//         <Check className="h-4 w-4" />
//       </MenubarPrimitive.ItemIndicator>
//     </span>
//     {children}
//   </MenubarPrimitive.CheckboxItem>
// ))
// MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

// const MenubarRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
//   <MenubarPrimitive.RadioItem
//     ref={ref}
//     className={ (
//       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
//       className
//     )}
//     {...props}
//   >
//     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//       <MenubarPrimitive.ItemIndicator>
//         <Circle className="h-2 w-2 fill-current" />
//       </MenubarPrimitive.ItemIndicator>
//     </span>
//     {children}
//   </MenubarPrimitive.RadioItem>
// ))
// MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

// const MenubarLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
//   <MenubarPrimitive.Label
//     ref={ref}
//     className={ (
//       "px-2 py-1.5 text-sm font-semibold",
//       inset && "pl-8",
//       className
//     )}
//     {...props}
//   />
// ))
// MenubarLabel.displayName = MenubarPrimitive.Label.displayName

// const MenubarSeparator = React.forwardRef(({ className, ...props }, ref) => (
//   <MenubarPrimitive.Separator
//     ref={ref}
//     className={ ("-mx-1 my-1 h-px bg-muted", className)}
//     {...props}
//   />
// ))
// MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

// const MenubarShortcut = ({ className, ...props }) => {
//   return (
//     <span
//       className={ (
//         "ml-auto text-xs tracking-widest text-muted-foreground",
//         className
//       )}
//       {...props}
//     />
//   )
// }
// MenubarShortcut.displayName = "MenubarShortcut"

// export {
//   Menubar,
//   MenubarMenu,
//   MenubarTrigger,
//   MenubarContent,
//   MenubarItem,
//   MenubarSeparator,
//   MenubarLabel,
//   MenubarCheckboxItem,
//   MenubarRadioGroup,
//   MenubarRadioItem,
//   MenubarPortal,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarGroup,
//   MenubarSub,
//   MenubarShortcut,
// }
