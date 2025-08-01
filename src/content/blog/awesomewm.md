---
title: 'Managing rounder corners in AwesomeWM and Picom'
description: 'Lorem ipsum dolor sit amet'
pubDate: 'Jul 08 2022'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

## Rounder corners look nice for single windows but looks weird fullscreen

I'm currently using [AwesomeWM](https://awesomewm.org/) as my windows manager and [Picom](https://picom.app/) as my compositor for added bling.
The tile mode is what I exclusivelly use as floating windows are a source of anxiety and nobody has got time for rearanging windows all day long.

For added cognitive perception of tilled windows I configured my theme to have small gap and rounded corners, it helps my brain diferentiates between windows. And to indentify the active window I also added a small blue border. It works pretty well and look pretty nice and minimal, exactly what I want for my workstation.

The issue arise when I only have one window on screen, gaps and borders arround it looks only like wasted screen real estate and the corners just look like there is missing pixels on the corner of my monitor.

Getting rid of the gap was as easy as adding a line to the theme:

``` lua
theme.gap_single_client = false

```

But removing borders a little more complicated.

This code in your AwesomeWM config  ie. *rc.lua* will effectively remove borders if only one client is present in the tag.

``` lua
-- No borders when rearranging only one non-floating or maximized client
screen.connect_signal("arrange", function(s)
 local only_one = #s.tiled_clients == 1
 for _, c in pairs(s.clients) do
  if only_one and not c.floating or c.maximized then
   c.border_width = 0 -- remove border
  else
   c.border_width = beautiful.border_width
  end
 end
end)

```

Removing rounded corners on the other hand requires Picom and AwesomeWM to be able to communicate.

The first step is to add a property to the X window, let's call this property *_NO_ROUNDED_CORNERS*.

Thankfully AwesomeWM let us add a property to windows :

``` lua
c:set_xproperty("_NO_ROUNDED_CORNERS", true)
```

But beware ! The property need to be created beforeheand or Awesome will crash, to do that the following code need to be called before in the configuration.

``` lua
awesome.register_xproperty("_NO_ROUND_CORNERS", "boolean")
```

And the the finished code:

``` lua
-- No borders when rearranging only one non-floating or maximized client
screen.connect_signal("arrange", function(s)
 local only_one = #s.tiled_clients == 1
 for _, c in pairs(s.clients) do
  if only_one and not c.floating or c.maximized then
   c.border_width = 0 -- remove border
   -- Helps Picom to indentify windows without corners
   c:set_xproperty("_NO_ROUNDED_CORNERS", true) 
  else
   c.border_width = beautiful.border_width
   c:set_xproperty("_NO_ROUNDED_CORNERS", true)
  end
 end
end)

```

And now we need to tell Picom to blacklist windows with this property from rounded corners:

``` bash
#################################
#           Corners             #
#################################

# Exclude conditions for rounded corners.
rounded-corners-exclude = [
  "window_type = 'dock'",
  "window_type = 'desktop'",
  "_NO_ROUND_CORNERS@:c = true"
];
```

And it's done, if more than one window is present on screen, nice rounder corners will be applied !
