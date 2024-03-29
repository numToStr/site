---
title: Dot-Repeat in Vim and Neovim
description: Understand dot-repeat in-depth; One of the most powerful feature of vim and neovim
date: 2022-06-30
tag: [neovim, vim]
type: post
---

Vim (and Neovim) is the most powerful text editors. And one of the most powerful and my personal favourite feature is `.` keymap. Also commonly known as **dot-repeat**.

## Dot-Repeat

`.` allows you to repeat the last action for as many times you want in `NORMAL` mode. By default, dot-repeat only works for action that _changes the content of the buffer_ like inserting, deleting, replacing text etc. For example, if you press <kbd>d3w</kbd> to delete 3 words; then press <kbd>.</kbd> to repeat the same action again.

You can also prefix `.` with a `count` to repeat the action exact number of times. For example, Press <kbd>yy</kbd> to copy the line; Then <kbd>p</kbd> to paste (this changes the buffer content); Lastly, press <kbd>10.</kbd> to paste the line 10 times.

---

> NOTE: The examples below focuses more on Neovim 0.7 + Lua but the same is applicable on Vim + vimscript.

---

## Bring Your Own Dot

The native dot repeat is powerful but; Can we make our own dot repeat action? Yes, and We can do some cool stuff with it. Just like I did in [Comment.nvim](https://github.com/numToStr/Comment.nvim) which provides code comments keymap/action and allows you to repeat them using <kbd>.</kbd>

A simple dot repeat mapping looks like this

```lua filename="dot-repeat.lua" {3,5-6,13}
local counter = 0

function _G.__dot_repeat(motion) -- 4.
    if motion == nil then
        vim.o.operatorfunc = "v:lua.__dot_repeat" -- 3.
        return "g@" -- 2.
    end

    print("counter:", counter, "motion:", motion)
    counter = counter + 1
end

vim.keymap.set("n", "gt", _G.__dot_repeat, { expr = true }) -- 1.
```

<details>
    <summary>vimscript</summary>
    <div>

```vim filename="dot-repeat.vim" {3,5-6,13}
let s:counter = 0

function DotRepeat(motion = v:null) " 4.
    if a:motion == v:null
        set operatorfunc=DotRepeat " 3.
        return 'g@' " 2.
    endif

    echo 'counter:' s:counter 'motion:' a:motion
    let s:counter += 1
endfunction

nnoremap <expr> gt DotRepeat() " 1.
```

    </div>

</details>

Let's break this down

1.  Keymap is added using `vim.keymap.set` api with `{ expr = true }` as options
2.  `g@` is an operator that calls the function set by the `operatorfunc`
3.  `vim.o.operatorfunc` is where we set a function to be called by `g@`. Here we set it's value to `v:lua.__dot_repeat` where `v:lua` is an interface to call any lua expression like `__dot_repeat`.
4.  `__dot_repeat` is a global function in lua and `motion` parameter is a string that denotes a motion

> TIP: If you are a lua plugin author, you can set `operatorfunc` using this syntax `"v:lua.require'my-plugin'.repeat_function"`

## How does it all work?

When you press <kbd>gt</kbd> it will execute `__dot_repeat` function with argument `motion = nil`. So we update the `operatorfunc` value and return `g@` but because we specified `{ expr = true }`, neovim will also execute `g@` operator returned by the function.

After `g@` is executed, you'll enter `Operator-pending-mode` where neovim will wait for any motion <kbd>w</kbd><kbd>b</kbd><kbd>h</kbd><kbd>j</kbd><kbd>k</kbd><kbd>l</kbd> or text-object <kbd>iw</kbd><kbd>a\{</kbd><kbd>i]</kbd><kbd>at</kbd> keys to be pressed and then executes the function set by the `operatorfunc` with the a string argument.

Finally, press <kbd>.</kbd> which executes the last <kbd>[count]g@\{motion\}</kbd>. You can see the `counter` incrementing in the command area.

---

For example, If you press `gtk` then the flow will look something like this:

```
gt
|
-> __dot_repeat(motion = nil)
           |
           -> operatorfunc = 'v:lua.__dot_repeat'
           -> return g@
                      |
              Operator-pending-mode
                      |
                      -> k
                         |
                         -> call operatorfunc
                                     |
                                     -> __dot_repeat(motion = 'line')
                                               |
                                               -> print(counter, motion)
                                               -> inc counter
```

For dot-repeat, it will look like

```
dot (.)
|
-> g@k
    |
    -> call operatorfunc
                |
                -> __dot_repeat(motion = 'line')
                          |
                          -> print(counter, motion)
                          -> inc counter
```

## Count Support

`count` is a number which get its value when you press any number keys i.e., <kbd>0-Infinity</kbd> and using `vim.v.count` (starts from `0`) or `vim.v.count1` (starts from `1`) we can read it.

> In vimscript, use `v:count` and `v:count1` variables

There are two ways that anyone would want to use `count` with dot-repeat

1. `{count}.` - To `.` repeat the action `count` times
2. `{count}gt{motion}` then `.` - Here `count` is a part of keymap and `.` is repating the keymap only 1 time

Fortunately, both of these cases are same and can be supported with a single function

```lua filename="count-repeat.lua" {9}
function _G.__dot_repeat(motion)
    if motion == nil then
        vim.o.operatorfunc = "v:lua.__dot_repeat"
        return "g@"
    end

    -- Print vim.v.count lines from the current cursor position
    local row = unpack(vim.api.nvim_win_get_cursor(0))
    local lines = vim.api.nvim_buf_get_lines(0, row - 1, (row + vim.v.count) - 1, false)

    print(vim.inspect(lines))
end

vim.keymap.set("n", "gt", _G.__dot_repeat, { expr = true })
```

<details>
    <summary>vimscript</summary>
    <div>

```vim filename="count-repeat.vim" {9}
function DotRepeat(motion = v:null)
    if a:motion == v:null
        set operatorfunc=DotRepeat
        return 'g@'
    endif

    " Prints v:count lines from the current cursor position
    let curpos = getcurpos()
    echom getline(curpos[1], (curpos[1] + v:count) - 1)
endfunction

nnoremap <expr> gt DotRepeat()
```

    </div>

</details>

Pressing <kbd>10gtk</kbd> will print 10 lines from the current cursor position. And pressing <kbd>.</kbd> will repeat the same as <kbd>10g@k</kbd>.

> NOTE: If you press <kbd>20.</kbd> after <kbd>10gtk</kbd> then value of `vim.v.count` will be 20 instead of 10

## Using Motion

The value of `motion` argument could be one of `line`, `char` or `block` and we can check it to see which motion was used. And using `'[` and `']` marks we can get the precise range of the motion.

```lua filename="motion-repeat.lua" {7,9,11,15-18}
function _G.__dot_repeat(motion)
    if motion == nil then
        vim.o.operatorfunc = "v:lua.__dot_repeat"
        return "g@"
    end

    if motion == "char" then
        print("motion on the same line i.e., f{char} b{char} [count]w etc.")
    elseif motion == "line" then
        print("motion over multiple lines i.e., [count]k [count]j etc.")
    elseif motion == "block" then
        print("IDK when this happens")
    end

    local range = {
        starting = vim.api.nvim_buf_get_mark(0, "["),
        ending = vim.api.nvim_buf_get_mark(0, "]"),
    }

    print(vim.inspect(range))
end

vim.keymap.set("n", "gt", _G.__dot_repeat, { expr = true })
```

<details>
    <summary>vimscript</summary>
    <div>

```vim filename="motion-repeat.vim" {7,9,11,15-17}
function DotRepeat(motion = v:null)
    if a:motion == v:null
        set operatorfunc=DotRepeat
        return 'g@'
    endif

    if a:motion == "char"
        echom "motion on the same line i.e., f{char} b{char} [count]w etc."
    elseif a:motion == "line"
        echom "motion over multiple lines i.e., [count]k [count]j etc."
    elseif a:motion == "block"
        echom "IDK when this happens"
    end

    let range = {}
    let range.starting = getpos("'[")
    let range.ending = getpos("']")

    echom range
endfunction

nnoremap <expr> gt DotRepeat()
```

    </div>

</details>

Pressing <kbd>gt10j</kbd> (`10j` is the motion) will print the range of motion. And <kbd>.</kbd> will repeat the same as <kbd>10g@j</kbd>

> NOTE: `nvim_buf_get_mark` api only accepts the mark name, excluding the `'` character

**Visual Mode**

We can use the same function in `VISUAL` mode with a little trick. _IMO dot-repeat is not that useful in visual mode so I left it out._

```lua filename="visual-repeat.lua" {2,15-18,24}
function _G.__dot_repeat(motion)
    local is_visual = string.match(motion or '', "[vV]") -- 2.

    if not is_visual and motion == nil then
        vim.o.operatorfunc = "v:lua.__dot_repeat"
        return "g@"
    end

    if is_visual then
        print("VISUAL mode")
    else
        print("NORMAL mode")
    end

    local range = { -- 3.
        starting = vim.api.nvim_buf_get_mark(0, is_visual and "<" or "["),
        ending = vim.api.nvim_buf_get_mark(0, is_visual and ">" or "]"),
    }

    print(vim.inspect(range))
end

vim.keymap.set("n", "gt", _G.__dot_repeat, { expr = true })
vim.keymap.set("x", "gt", "<ESC><CMD>lua _G.__dot_repeat(vim.fn.visualmode())<CR>") -- 1.
```

<details>
    <summary>vimscript</summary>
    <div>

```vim filename="visual-repeat.vim" {2,15-17,23}
function DotRepeat(motion = v:null)
    let is_visual = a:motion == 'V' && a:motion == 'v' " 2.

    if !is_visual && a:motion == v:null
        set operatorfunc=DotRepeat
        return 'g@'
    endif

    if is_visual
        echom "VISUAL mode"
    else
        echom "NORMAL mode"
    end

    let range = {} " 3.
    let range.starting = getpos(is_visual ? "'<" : "'[")
    let range.ending = getpos(is_visual ? "'>" : "']")

    echom range
endfunction

nnoremap <expr> gt DotRepeat()
xnoremap gt <ESC><CMD>call DotRepeat(visualmode())<CR> " 1.
```

    </div>

</details>

1. We have to `<ESC>` first and only after that visual marks `'<` and `'>` are populated

    - `vim.fn.visualmode()` returns one of `v`, `V` or `<CTRL-v>`

2. Checking `motion` for any `VISUAL` mode characters
3. Using `'<` and `'>` marks to get the selection range

> NOTE:
>
> 1.  I am using `<ESC><CMD>` instead of `:<C-u>` in the keymap to avoid triggering `CmdLineEnter` autocmd
> 2.  I am not handling `VISUAL-BLOCK` mode i.e., `<CTRL-v>` or dot-repeat. Maybe you could do it(?)

---

<small>

    > `:help` is available for most of the topic described in this post :)

</small>
