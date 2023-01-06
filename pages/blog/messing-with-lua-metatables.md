---
title: Messing with lua metatables
description: because more we mess around; the more we find out!
date: 2023-01-05
tag: [neovim, lua]
type: post
---

Some programming languages allows user to extends builtin data types with the help of constructs that is builtin to the language. In Rust, you can extend a [`struct{:rust}`](https://doc.rust-lang.org/stable/std/keyword.struct.html) by implementing various traits like [`Add{:rust}`](https://doc.rust-lang.org/stable/std/ops/trait.Add.html), [`Sub{:rust}`](https://doc.rust-lang.org/stable/std/ops/trait.Sub.html), [`Mul{:rust}`](https://doc.rust-lang.org/stable/std/ops/trait.Mul.html) etc,. to extend it's capabilities. _Let's see what Lua has to offer!_

> <small>NOTE: We are only going to use Lua 5.1 as this the version that is supported by [LuaJIT](https://luajit.org/).</small>

## Metatables

In Lua, we have [`setmetatable{:lua}`](https://www.lua.org/pil/13.html) which allows us to extends/change lua [`table{:lua}`](https://www.lua.org/pil/11.html) behaviour. We can use metatable to add support for [operator overloading](#operator-overloading) and some other [crazy stuff](#crazy-stuff) into your tables.

From Official Docs:

> Metatables allow us to change the behavior of a table. For instance, using metatables, we can define how Lua computes the expression a+b, where a and b are tables. Whenever Lua tries to add two tables, it checks whether either of them has a metatable and whether that metatable has an `__add` field. If Lua finds this field, it calls the corresponding value (the so-called metamethod, which should be a function) to compute the sum.

Barebones example:

```lua filename="metatable.lua"
local a = setmetatable({ x = 10 }, {})

print(a.x) -- prints 10
print(getmetatable(a)) -- returns a's metatable
```

`setmetatable` takes 2 parameters; first is the initial table and second is another table with the _metamethods_.

## Metamethods

So, how do we use `setmetatable`? Well, here comes [**metamethods**](http://lua-users.org/wiki/MetatableEvents). These are set of methods that defines how your table should behave when certain operation is performed. Let's see how we can add two tables together:

```lua filename="__add.lua" {5,19}
local mt = {}

-- Called when using `+`
-- Here `self` is right hand operand and `that` is left hand operand
function mt:__add(that)
    return self.x + that.x
end

-- Another syntax to define methods is using `.`
-- In this you get the `self` as the first argument; we named it as `this`
--
-- function mt.__add(this, that)
--     return this.x + that.x
-- end

local a = setmetatable({ x = 10 }, mt)
local b = setmetatable({ x = 5 }, mt)

print(a + b) -- prints 15
```

<section id="operator-overloading"></section>

Going with the above example, we can also add support for subtraction (`-`), multiplication `*` , less-than (`<`), less-than-equal (`<=`), equality (`==`), concatenation (`..`) and so on.

```lua filename="metatable.lua" {4,9,14,19,24,29,34,41-47}
local mt = {}

-- Called when using `+`
function mt:__add(that)
    return self.x + that.x
end

-- Called when using `-`
function mt:__sub(that)
    return self.x - that.x
end

-- Called when using `*`
function mt:__mul(that)
    return self.x * that.x
end

-- Called when using `<`
function mt:__lt(that)
    return self.x < that.x
end

-- Called when using `<=`
function mt:__lte(that)
    return self.x <= that.x
end

-- Called when using `==`
function mt:__eq(that)
    return self.x == that.x
end

-- Called when using `..`
function mt:__concat(that)
    return { x = self.x + that.x }
end

local a = setmetatable({ x = 10 }, mt)
local b = setmetatable({ x = 5 }, mt)

print(a + b) -- prints 15
print(a - b) -- prints 5
print(a * b) -- prints 50
print(a < b) -- prints false
print(a > b) -- prints true
print(a == b) -- prints false
print((a .. b).x) -- prints 15
```

> **NOTE**: There is no `__gt` (greater-than `>`), `__gte` (greater-than-equal `>=`) and `__ne` (not-equal `~=`) because they are just inverse of `__lt`, `__lte` and `__eq` respectively.

Check out http://lua-users.org/wiki/MetatableEvents to know the list of the supported metamethods and their signature.

## Taming Superpowers

I've used metatables extensively in some of neovim plugins like [`Comment.nvim`](https://github.com/numToStr/Comment.nvim), [`Navigator.nvim`](https://github.com/numToStr/Navigator.nvim), and [`FTerm.nvim`](https://github.com/numToStr/FTerm.nvim) and believe me there are certain metamethods that are really like giving tables superpowers.

### `__index`

This controls prototype inheritence. Whenever we access a field, lua checks whether that field is present or not in the initial table, if not, then `__index` is used to return the field. We can either give it a function or another table. Let's see how it works

-   **With a `table`**

```lua filename="__index.lua" {3,7-9}
local mt = {}

mt.__index = { y = 5 }

local a = setmetatable({ x = 10 }, mt)

print(a.x) -- prints 10
print(a.y) -- prints 5
print(a.z) -- prints nil
```

As you can see, `a.y` doesn't exists on the initial table so `__index` is indexed for the field and the value will be returned.

-   **With a `function`**

```lua filename="__index.lua" {3,15-16}
local mt = {}

function mt.__index(this, key)
    return this.x + #key
end

-- We can also use `:` syntax
--
-- function mt:__index(key)
--     return self.x + #key
-- end

local a = setmetatable({ x = 10 }, mt)

print(a.x) -- prints 10
print(a.hello) -- prints 15
```

In the example, `a.x` is present, but `a.hello` is missing, hence `__index` is called with the table as the first and `hello` as the second argument, and we are returning the sum of `x` and length of the key.

<section id="crazy-stuff"></section>

We can also use `__index` method to:

<details>
    <summary>Track property usage</summary>

```lua filename="track.lua"
local state = { hello = "world" }
local count = {}

local proxy = setmetatable({}, {
    __index = function(_, key)
        count[key] = count[key] + 1
        return state[key]
    end,
})

print(proxy.hello)
```

</details>

<details>
    <summary>Proxy Getter</summary>

```lua filename="proxy.lua"
local cstrs = {
    c = { '//%s', '/*%s*/' },
}

local strings = setmetatable({}, {
    __index = function(_, key)
        return function(ctype)
            if type(ctype) == 'number' then
                return cstrs[key][ctype]
            end
            return unpack(cstrs[key])
        end
    end,
})

print(strings.c()) -- prints "//%s" "/*%s*/"
print(strings.c(1)) -- prints "//%s"
print(strings.c(2)) -- prints "/*%s*/"
```

</details>

<details>
    <summary>Default value</summary>

```lua filename="default_value.lua"
local num = setmetatable({}, {
    __index = function()
        return 0
    end,
})

print(num.one) -- prints 0
print(num.two) -- prints 0
```

</details>

<details>
    <summary>Class-like Inheritance</summary>

```lua filename="inheritence.lua"
---@class Animal
---@field private type string
local Animal = {}

---Creates an animal
---@param type? string Type of animal
---@return Animal
function Animal:new(type)
    local state = { type = type }
    self.__index = self
    return setmetatable(state, self)
end

function Animal:explain()
    print('Hello! I am a', self.type)
end

---@class Dog : Animal
local Dog = Animal:new('dog')

function Dog.make_sound()
    print('Woof Woof!')
end

---@class Cat:Animal
---@field private type string
local Cat = Animal:new('cat')

---Makes cat sound
function Cat.make_sound()
    print('Meeooowww!')
end

function Cat:want_food()
    print('Yes!', self.type, 'wants food.')
end

------------------- USAGE -------------------

-- Base Animal
local dino = Animal:new('dino')
dino:explain()

-- Base dog class
Dog:explain()
Dog:make_sound()

-- Dog class with different type
local dalmation = Dog:new("dalmation")
dalmation:explain()
dalmation:make_sound()

-- Base cat class
local cat = Cat:new()
cat:explain()
cat:make_sound()
cat:want_food()
```

</details>

> <small>As for myself, I used these techniques to [add](https://github.com/numToStr/Comment.nvim/pull/245) and [simplify](https://github.com/numToStr/Comment.nvim/pull/183) features in Comment.nvim and added [inheritence](https://github.com/numToStr/Navigator.nvim/wiki/Custom-Multiplexer#extending-from-vi) in Navigator.nvim </small>

### `__newindex`

This metamethod controls the assignment and it's called whenever we assign a value to a new property, which doesn't exists in the initial table.

```lua filename="__newindex.lua" {5,11-13,15-18}
local proxy = {}

local mt = {}

function mt.__newindex(this, key, val)
    proxy[key] = string.format("%s %s", key, val)
end

local a = setmetatable({ x = 10 }, mt)

a.hello = "world"
a.foo = "bar"
a.x = 15

print(proxy.hello) -- prints "hello world"
print(proxy.foo) -- prints "foo bar"
print(proxy.x) -- prints nil
print(a.x) -- prints 15
```

This method will be called for `a.hello` and `a.foo` but not for `a.x` as it already exists in the initial table. It receives the initial table, the key, and the value as the arguments. In this example, we are using `a` as the setter for the `proxy` table but you can do much more, for example:

<details>
    <summary>Read-only Tables</summary>

```lua filename="read_only.lua" {2,8,11}
local a = setmetatable({ x = 10 }, {
    __newindex = function(_, key, val)
        assert(false, string.format("Read-only Table! Cannot assign %q to %q", val, key))
    end
})

-- This won't throw any error
a.x = 5

-- This will throw error as `y` doesn't exist
a.y = 100
```

</details>

### `__call`

This metamethod makes a table callable like a normal function and the returned value of the function is returned at the call site. Although you can still access properties of the table as usual.

```lua filename="__call.lua" {3,9-10}
local mt = {}

function mt.__call(this, arg)
    return this.x + arg
end

local a = setmetatable({ x = 10 }, mt)

print(a(5)) -- prints 15
print(a.x) -- prints 10
```

By providing `__call` metamethod, we can now call our table `a` as a function and still have access to it's property i.e., `a.x`. We'll later see how we can combine this with `__index` to make a powerful abstraction.

### `__tostring`

Using this metamethod, we can have a string representation of a table.

```lua filename="__tostring.lua" {4,11-12,14-15}
local mt = {}
local icon = { dir = "D", file = "F" }

function mt.__tostring(this)
    return string.format("[%s] %s", icon[this.type], this.name)
end

local node1 = setmetatable({ type = "dir", name = "node_modules" }, mt)
local node2 = setmetatable({ type = "file", name = "package.json" }, mt)

tostring(node1) -- return "[D] node_modules"
tostring(node2) -- returns "[F] package.json"

print(node1) -- prints "[D] node_modules"
print(node2) -- prints "[F] package.json"
```

In the example, we are using builtin `tostring(table){:lua}` which calls the `__tostring` methods and the returned value is used as the string representation. The string representation can also be used with `assert(..., node1){:lua}` and `print(table){:lua}`

### Combining Everything

I hope you got a basic understanding of metatable and how it works. Now let's see how we can combine everything and make _something similar_ to neovim's `vim.cmd` interface.

```lua filename="nvim_cmd.lua" showLineNumbers {5,14,18}
local nvim = {}

nvim.cmd = setmetatable({}, {
    __index = function(_, cmd)
        return function(arg)
            local args = type(arg) == "table" and arg.args or { arg }
            return vim.api.nvim_cmd(
                { cmd = cmd, args = args },
                { output = true }
            )
        end
    end,
    __newindex = function(this, cmd, arg)
        this[cmd](arg)
    end,
    __call = function(this, cmd)
        if type(cmd) == "table" then
            return this[cmd.cmd](cmd)
        end
        return vim.api.nvim_command(cmd)
    end,
    __tostring = function(_)
        return "<CMD>"
    end,
})

return nvim
```

Here's how you can use it

```lua
-- Runs __index
nvim.cmd.echo({ args = { "3" } })
nvim.cmd.echo("4")

--- Runs __newindex
nvim.cmd.echo = "5"
nvim.cmd.echo = { args = { "6" } }

-- Runs __call
nvim.cmd('echo "1"')
nvim.cmd({ cmd = "echo", args = { "2" } })

--- Runs __tostring
local _ = tostring(nvim.cmd) -- returns "<CMD>"
print(nvim.cmd) -- prints "<CMD>"
```

Couple of things to note here:

-   `__index` returns a function (_ln:5_), this means when we try to index a field i.e., `nvim.cmd.echo` it'll return a function so that we call it like a normal function.
-   On line no. 14 and 18, we are reusing the `__index` method implictly inside `__newindex` and `__call` respectively. Pretty Neat!

---

I hope now that you understand how we can use metatables to cook up some elegant user facing APIs. If you want to deep dive and learn more then you should checkout this execellent post: [all-you-need-to-know-about-metatables-and-metamethods](https://devforum.roblox.com/t/all-you-need-to-know-about-metatables-and-metamethods/503259).
