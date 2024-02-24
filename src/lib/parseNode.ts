const parseNode = (node: any) => {
  console.log("incoming node", node);
  if (node.type === "html") {
    let nodeType = "html";
    if (node.value.includes("iframe")) {
      nodeType = "iframe";
    }
    const newNode = {
      type: "html",
      nodeType: nodeType,
      value: node.value,
      content: [],
    };
    return newNode;
  }
  if (node.type === "image") {
    const newNode = {
      data: {
        target: {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: node?.url || "",
            alt: node?.alt || "",
          },
        },
      },
      content: [],
      nodeType: "embedded-asset-block",
      type: "embedded-asset-block",
    };
    return newNode;
  }
  if (node.type === "linkReference") {
    const newNode = {
      type: "linkReference",
      nodeType: "linkReference",
      value: node.label,
      content: [],
    };
    return newNode;
  }
  return null;
};

export default parseNode;
