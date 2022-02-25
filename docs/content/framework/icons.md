# Icons

The graphcommerce UI looks clean and minimalistic due to the use of icons. This
guide covers how to customize the look of icons, how to use different icons in
components and how to add your own.

## Customizing icon styling

All icons strokeWidths are dependent of the value of `shape`. To change the
default strokeWidth, modify the value `theme.shape.strokeWidth` in
/components/theme.ts:

```ts
// Example from /components/theme.ts

...
shape: { borderRadius: 4, strokeWidth: 1 },
```

To override the default color for all icons:

```ts
// Example from /components/theme.ts

styleOverrides: {
  ...
  '& .SvgIcon': {
    color: theme.palette.primary.main,
  },
},
```

Use the sx prop to customise the styling of an icon in a component:

```tsx
<SvgIcon src={iconCustomerService} size='large' sx={{ strokeWidth: '0.8px' }} />
```

## Using a different icon from the icon pack

To replace an icon in a component, update the import and src prop of the
`SvgIcon` component.

In /components/Layout/LayoutFull.tsx:

```tsx
...
import iconCustomerService from '@graphcommerce/next-ui'

...
return (
  <SvgIcon src={iconCustomerService} size='large' />
)
```

Replace iconCustomerService with an icon of your choosing:

```tsx
...
import iconSupport from '@graphcommerce/next-ui/icons/support.svg'

...
return (
  <SvgIcon src={iconSupport} size='large' />
)
```

> All [Ikonate ↗](https://ikonate.com/) icons are included with GraphCommerce:
>
> ```txt
> // Sample of icons in the directory /node_modules/@graphcommerce/next-ui/icons
>
> ...
> └── bike.svg
> └── bin.svg
> └── bluetooth.svg
> └── bolt.svg
> └── book-opened.svg
> └── book.svg
> └── bookmark.svg
> └── box-alt.svg
> └── box-alt2.svg
> └── box.svg
> └── brightness.svg
> ```

## Override with the icon prop

Some components offer a prop to override the icon. In
/components/Layout/LayoutFull.tsx, you can add the `icon` prop to the
`CustomerFab` component to change the icon:

```tsx
import iconUser from '@graphcommerce/next-ui/icons/user.svg'

...
<CustomerFab
  guestHref='/account/signin'
  authHref='/account'
  icon={<SvgIcon src={iconUser} size='large' />}
/>
```

## Icon SVG specifications

To use a custom icon that you design yourself, the icon must consist of paths
without fills. The path must be wrapped in a `<symbol>` that has an attribute
`id='icon'`:

```svg
// Example from /node_modules/@graphcommerce/next-ui/icons/chat.svg:

<svg
  role='img'
  xmlns='http://www.w3.org/2000/svg'
  width='48px'
  height='48px'
  aria-labelledby='chatIconTitle'
  stroke='#2329D6'
  stroke-width='1'
  stroke-linecap='square'
  stroke-linejoin='miter'
  fill='none'
  color='#2329D6'
>
  <title id='chatIconTitle'>Chat</title>
  <symbol id='icon' viewBox='0 0 24 24'>
    <path d='M8.82388455,18.5880577 L4,21 L4.65322944,16.4273939 C3.00629211,15.0013 2,13.0946628 2,11 C2,6.581722 6.4771525,3 12,3 C17.5228475,3 22,6.581722 22,11 C22,15.418278 17.5228475,19 12,19 C10.8897425,19 9.82174472,18.8552518 8.82388455,18.5880577 Z' />
  </symbol>
</svg>
```

Icons can be placed in the same directory as a page or component and can be
imported from there (the `<SvgIcon>` component will convert the relative path to
an absolute path)

```tsx
...
import customIcon from './my-custom-icon.svg'

...
return (
  <SvgIcon src={iconSucustomIconpport} size='large' />
)
```

To use a custom icon in your component, follow the same steps as described in
the [previous paragraph](#using-a-different-icon-from-the-icon-pack).

> As a starting point, it's advised to open one of the included icons in your
> design tool (for example, Sketch or Figma).

## Using a different icon pack

To override all or multiple icons with your own, add an icon override array to
/theme.ts:

```tsx
// /components/theme.ts
import customCartIcon from './my-custom-cart-icon.svg'

...
[iconShoppingBag, customCartIcon]
```

All icons must meet the svg specifications as described above

<details>
<summary>List of icons used</summary>

iconSearch  
iconPerson  
iconChevronDown  
iconChevronLeft  
iconChevronRight  
iconChevronUp  
iconAddresses  
iconHeart  
iconLocation  
iconInvoice  
iconCustomerService  
iconShoppingBag  
iconFullscreenExit  
iconChat  
iconChevronBack  
iconCancelAlt  
iconEmail  
iconCheckmark  
iconArrowBack  
iconArrowForward  
iconMenu  
iconMin  
iconPhone  
iconPlus  
iconClose  
iconFullscreen  
iconOrderBefore  
iconBox  
iconHome  
iconId  
iconLock  
iconNewspaper  
iconSadFace  
iconShutdown  
iconParty  
iconStar  
iconEmailOutline  
icon404  
iconSun  
iconMoon

</details>

## Next steps

- Learn more about [theming](../framework/theming.md) a GraphCommerce storefront