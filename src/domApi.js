window.dom = {
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim() //trim()去除首尾多余的空格
        return container.content.firstChild
    },

    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },

    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },

    append(parent, node) {
        parent.appendChild(node)
    },

    wrap(node, parent) { //用 parent 包裹 node 节点
        dom.before(node, parent)
        dom.append(parent, node)
    },

    remove(node) { //移除 Node 节点, 子节点不影响
        node.parentNode.removeChild(node)
        return node
    },

    empty(node) { //清空 node 下面所有子节点
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    arrt(node, name, value) { //重载写法
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },

    text(node, string) { //在 node 中添加 string 文本内容
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },

    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },

    style(node, name, value) { //给 node 添加 name 属性,并赋值 value
        if (arguments.length === 3) {
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },

    class: { //class 的操作
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },

    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children.filter(n => n !== node))
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },

    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },

    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }





}