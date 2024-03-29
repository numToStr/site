---
title: LSP & Neovim; A Retrospective!
description: Going from a simple text editor to a coding experience that everyone loves and enjoys!
date: 2022-07-28
tag: [neovim, lsp]
type: post
---

What is [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (LSP)? It's a protocol specifically designed for IDE(s) to communicate with a language server to provide language features like auto-completion, go-to-definition, diagnostics, etc. LSP in itself is a [specification](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/) that defines how language author should write a **Language/LSP Server** and how IDE(s) should implement a **Language/LSP Client** so that both could understand each other. The message format defined by the protocol is `JSON` (RPC).

Nowadays most modern IDEs, and Text Editors like [Neovim](https://github.com/neovim/neovim), have a language client builtin that can understand the protocol and communicate with a language server.

> Some people still get confused between the protocol, server, and client. So there you have it :)

## Sans-LSP Era

I started using neovim around 4 years ago, and at that time there was no native LSP support but luckily there were some awesome LSP client implementations available for both neovim/vim.

> Honestly, when I started using neovim I didn't even know what was a LSP. I blame VSCode for spoiling me. So, like any other smooth brained human I googled "How to make neovim like VSCode?"

Enter [CoC.nvim](https://github.com/neoclide/coc.nvim) (**C**onquer **O**f **C**ompletion), for those who don't know, CoC.nvim is a LSP client implementation for neovim/vim that can communicate with a LSP server making our beloved editor as (more?) powerful as an IDE. So, I (not so) quickly configured CoC and was blown away by how much difference something like CoC can make and how easy is to extend CoC using a bucket load of [language server plugins](https://github.com/neoclide/coc.nvim/wiki/Language-servers#example-language-server-configuration) also known as coc plugins. CoC was a godsend for me because it allowed me to make neovim my primary editor. Especially for [javascript/typescript](https://github.com/neoclide/coc-tsserver) development CoC was perfect. Need `prettier`? [Boom](https://github.com/neoclide/coc-prettier). Need `eslint`? [Got'em](https://github.com/neoclide/coc-eslint). In my opinion, CoC.nvim was more like a headless VSCode because configuring the servers in CoC was similar to VSCode and it was also capable of handling snippets, auto-completion, etc.

Although LSP client being a critical part of a modern editing experience, there was something that was left to be desired. This was heard by [Neovim Team](https://github.com/orgs/neovim/people) loud and clear, and they were cooking something for everyone.

## Woaahhh! We now have LSP

After a couple of years of last major release, Neovim v0.5.0 got released on July 2021, finally ending the question _"Release 0.5.0! When?"_. This was the first release that brought native LSP [#11336](https://github.com/neovim/neovim/pull/11336) [#11430](https://github.com/neovim/neovim/pull/11430) and first-class [Lua](https://www.lua.org/about.html), and experimental [treesitter](https://tree-sitter.github.io/tree-sitter/) [#10124](https://github.com/neovim/neovim/pull/10124) support. Everyone in the community was happy to seeing it finally released.

Neovim exposed generic [lua API](https://github.com/neovim/neovim/pull/11430) for setting up LSP servers but most users got confused on the setup part. Thus the birth of [`lspconfig`](https://github.com/neovim/nvim-lspconfig) (initially called `nvim-lsp`) which was, still is, a plugin that contains configuration for various language servers making it painless to setup native LSP. And some brave (nightly) users had already [created](https://github.com/glepnir/lspsaga.nvim) [awesome](https://github.com/hrsh7th/nvim-compe) [plugins](https://github.com/RishabhRD/nvim-lsputils) to further make the native LSP adoption easy and seamless.

Using `lspconfig` is pretty easy and straightforward. Following example shows how to setup [`rust-analyzer`](https://rust-analyzer.github.io/) and [`lua-language-server`](https://github.com/sumneko/lua-language-server/)

```lua filename="servers.lua" {1,11,24}
local lsp = require("lspconfig")

local function on_attach(client, buf)
    vim.keymap.set("n", "gd", vim.lsp.buf.definition, { buffer = buf })
    vim.keymap.set("n", "gh", vim.lsp.buf.hover, { buffer = buf })
    vim.keymap.set("n", "[g", vim.diagnostic.goto_prev, { buffer = buf })
    vim.keymap.set("n", "]g", vim.diagnostic.goto_next, { buffer = buf })
end

-- Lua
lsp.sumneko_lua.setup({
    on_attach = on_attach,
    settings = {
        Lua = {
            completion = { enable = true, showWord = "Disable" },
            runtime = { version = "LuaJIT" },
            workspace = { library = { os.getenv("VIMRUNTIME") } },
            telemetry = { enable = false },
        },
    },
})

-- Rust
lsp.rust_analyzer.setup({
    on_attach = on_attach,
    settings = {
        ["rust-analyzer"] = {
            cargo = { allFeatures = true },
            checkOnSave = { allFeatures = true, command = "clippy" },
        },
    },
})
```

> You need to use a plugin manager in order to install `lspconfig`. I recommend [`packer.nvim`](https://github.com/wbthomason/packer.nvim).

Being an early and first iteration of the implementation comes with apparent bugs, usability, and extensibility issues. I think everyone was aware of that but still, that didn't stop most users to adopt native LSP and help Neovim Team to polish the LSP experience. For the rest, myself included, they wanted to give native LSP some time to mature so they can port their workflow from CoC.nvim or VSCode.

## LSP goes on

On Nov 2021, We got v0.6.0 which improves upon the initial LSP and Lua experience, including bug fixes, [performance](https://github.com/neovim/neovim/pull/15854) and API improvements, etc., and also brought standalone [diagnostics module](https://github.com/neovim/neovim/pull/15585) for linters like eslint, luacheck, etc. This release was perfect in terms of stability and widespread adoption. I finally jumped onto the native LSP train from CoC.nvim, but it wasn't that easy. Being a web developer requires you to deal with some "javascript" shenanigans like prettier, eslint etc. Also, the fact that typescript doesn't have an official language server despite Microsoft being the creator of typescript breaks my brain. It took me months to [move everything](https://github.com/numToStr/dotfiles/pull/14) from CoC.nvim to `lspconfig`, [`nvim-cmp`](https://github.com/hrsh7th/nvim-cmp/) (for snippets & auto-completion) and [`null-ls`](https://github.com/jose-elias-alvarez/null-ls.nvim/) (for `eslint` and `prettier`). Before all these features were handled my CoC alone, which makes you respect the project more.

Despite being lightweight and performant, there were some questions regarding LSP client's performance and some comparing with CoC.nvim (reddit: [1](https://www.reddit.com/r/vim/comments/l3m33k/lsp_usage_and_performance/) [2](https://www.reddit.com/r/neovim/comments/qrjd9r/coc_or_builtinlsp/) [3](https://www.reddit.com/r/neovim/comments/rtm0tj/is_it_just_for_me_or_is_native_lsp_worse_in/) [4](https://www.reddit.com/r/neovim/comments/rr6npy/question_coc_vs_lsp_whats_exactly_the_difference/)). Nevertheless, v0.6.0 was a solid release.

> In my experience, Neovim's LSP client was just as good as CoC or VSCode. What people don't realize is that sometimes their LSP server could be the reason for slow down which leads to editor/LSP client being slow. And to be honest, Neovim + LSP is a much better experience than slow-as-molasses VSCode.

Couple of months later, We got v0.7.0 release on April 2022, including bug fixes to LSP but this release was more focused on improving existing and bringing new Lua APIs like [autocmds](https://github.com/neovim/neovim/pull/14661), [filetype.lua](https://github.com/neovim/neovim/pull/16600).

## Into The Future

We have come a long way since the initial LSP support in v0.5.0 and I believe that the current LSP interface is fairly stable. The team is now focusing on improving the user experience and upstreaming some of the best parts of `lspconfig` into the core. And one of the API is `vim.lsp.start()` [#18631](https://github.com/neovim/neovim/pull/18631). The main difference between `vim.lsp.start()` and `vim.lsp.start_client()` is that the former automatically re-attaches the running LSP server to the current buffer. The second one is `LspAttach` and `LspDetach` autocmds [#18507](https://github.com/neovim/neovim/pull/18507), allowing easy configuration for lsp-related stuff like keymaps. All these shiny stuff will be released with v0.8.0.

> If you are impatient like me then check out [nightly](https://github.com/neovim/neovim/releases/tag/nightly) release

With v0.8.0, You could setup LSP server like `rust-analyzer`, `lua-language-server`, and some keymaps without any plugin:

```lua filename="servers.lua" {5,10,28,33,47,57}
local lsp = vim.api.nvim_create_augroup("LSP", { clear = true })

-- Lua
-- NOTE: you could also use ftplugin/lua.lua to setup the LSP server
vim.api.nvim_create_autocmd("FileType", {
    group = lsp,
    pattern = "lua",
    callback = function()
        local path = vim.fs.find({ ".luarc.json", ".luacheckrc", "stylua.toml", ".git" })
        vim.lsp.start({
            name = "lua-language-server",
            cmd = { "lua-language-server" },
            root_dir = vim.fs.dirname(path[1]),
            settings = {
                Lua = {
                    completion = { enable = true, showWord = "Disable" },
                    runtime = { version = "LuaJIT" },
                    workspace = { library = { os.getenv("VIMRUNTIME") } },
                    telemetry = { enable = false },
                },
            },
        })
    end,
})

-- Rust
-- NOTE: you could also use ftplugin/rust.lua to setup the LSP server
vim.api.nvim_create_autocmd("FileType", {
    group = lsp,
    pattern = "rust",
    callback = function()
        local path = vim.fs.find({ "Cargo.toml" }, { type = "file" })
        vim.lsp.start({
            name = "rust-analyzer",
            cmd = { "rust-analyzer" },
            root_dir = vim.fs.dirname(path[1]),
            settings = {
                ["rust-analyzer"] = {
                    cargo = { allFeatures = true },
                    checkOnSave = { allFeatures = true, command = "clippy" },
                },
            },
        })
    end,
})

vim.api.nvim_create_autocmd("LspAttach", {
    group = lsp,
    callback = function(args)
        vim.keymap.set("n", "gd", vim.lsp.buf.definition, { buffer = args.buf })
        vim.keymap.set("n", "gh", vim.lsp.buf.hover, { buffer = args.buf })
        vim.keymap.set("n", "[g", vim.diagnostic.goto_prev, { buffer = args.buf })
        vim.keymap.set("n", "]g", vim.diagnostic.goto_next, { buffer = args.buf })
    end,
})

vim.api.nvim_create_autocmd("LspDetach", {
    group = lsp,
    callback = function(args)
        vim.keymap.del("n", "gd", { buffer = args.buf })
        vim.keymap.del("n", "gh", { buffer = args.buf })
        vim.keymap.del("n", "[g", { buffer = args.buf })
        vim.keymap.del("n", "]g", { buffer = args.buf })
    end,
})
```

> Keep in mind that `lspconfig` is not going to be deprecated and will function alongside the new API. In fact, lspconfig is likely to get benefit from these new API changes.

---

At last, I would like to thank everyone who was, and still is, involved in the process of making LSP support a reality and improving numerous other things in Neovim :)
