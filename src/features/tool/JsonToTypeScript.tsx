
import { useState } from "preact/hooks";
const jsonToTypescript = (json: string) => {
  let obj;
  try {
    obj = JSON.parse(json);
  } catch (error) { }
  const objectToTypescript = (obj: any, depth: number) => {
    const type = typeof obj;
    if (["string", "number", "bigint", "boolean", "symbol", "undefined", "function"].includes(type)) {
      return type;
    } else {
      if (Array.isArray(obj)) {
        const first = obj[0];
        let elementType = "unknown";
        if (first !== undefined && first !== null) {
          elementType = objectToTypescript(first, depth + 1);
        }
        return `${elementType}[]`;
      } else if (obj === null) {
        return "null";
      } else {
        const intent = "  ";
        const fields: string[] = Object.keys(obj).map((key) => `${key}: ${objectToTypescript(obj[key], depth + 1)};`)
        return fields.length ? `{\n${fields.map(item => `${intent.repeat(depth + 1)}${item}`).join("\n")}\n${intent.repeat(depth)}}` : "{}";
      }
    }
  }
  if (!obj) {
    return "error:转换失败";
  } else {
    return objectToTypescript(obj, 0);
  }
}
export default () => {
  const [tsResult, setTsResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  return (
    <div className="flex flex-col h-screen text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-green-50">
      <h1 className="m-4 text-2xl">JSON转Typescript</h1>
      <div className="flex overflow-hidden flex-col flex-1 md:flex-row">
        <div className="flex relative flex-col flex-1 p-8 m-8 bg-white rounded-md shadow dark:bg-gray-700">
          <div className="flex flex-row justify-between mb-2 w-full">
            <div className="text-lg">输入JSON</div>
            <button
              className="px-2 text-white bg-blue-500"
              onClick={() => setTsResult(jsonToTypescript(jsonInput))}>
              转换
              </button>
          </div>
          <textarea
            className="flex-1 p-2 w-full bg-gray-50 dark:bg-gray-600"
            rows={10}
            value={jsonInput}
            onChange={e => setJsonInput(e?.currentTarget?.value)} />
        </div>
        <div className="flex overflow-hidden relative flex-col flex-1 p-8 m-8 bg-white rounded-md shadow dark:bg-gray-700">

          <div className="flex flex-row justify-between mb-2 w-full">
            <div className="text-lg">结果</div>
            <button
              className="px-2 text-white bg-blue-500"
              onClick={() => navigator.clipboard.writeText(tsResult).then(() => alert("复制成功"))}>
              复制
              </button>
          </div>
          <div className="overflow-y-auto flex-1 p-2 w-full whitespace-pre-wrap bg-gray-50 dark:bg-gray-600">
            {tsResult}
          </div>
        </div>
      </div>
    </div>
  )
}