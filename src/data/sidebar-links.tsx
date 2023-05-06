type SidebarType = "admin" | "shop"|'user-shop'

type SidebarLink = {
  title: string;
  pathName: string;
  icon?: string;
};

type SidebarLinks = {
  [key in SidebarType]: SidebarLink[];
};

export const auriginAfricaSidebarLinks: SidebarLinks = {
  admin: [
    {
      title: "Dashboard",
      pathName: "admin",
      icon: "fa fa-home",
    },
    {
        title: "Users",
        pathName: "adminUsers",
        icon: "fa fa-users",
    },
    {
      title:'Mpesa payments',
      pathName:"adminPayments",
      icon:'fa fa-dollar'
    },
    {
      title:'Product categories',
      pathName:"adminProductCategories",
      icon:'fa fa-list'
    },
    {
      title:'Products',
      pathName:"adminProducts",
      icon:'fa fa-shopping-basket'
    },
    

  
  ],
  shop: [],
  'user-shop':[
    {
      title: "Dashboard",
      pathName: "shop-profile-dashboard",
      icon: "fa fa-home",
    },
    {
      title: "Orders",
      pathName: "shop-profile-orders",
      icon: "fa fa-shopping-cart",
    },
    {
      title: "Payments",
      pathName: "shop-profile-payments",
      icon: "fa fa-dollar",
    },
  ]

};
