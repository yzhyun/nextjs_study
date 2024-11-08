import { title, subtitle } from "@/components/primitives";
import Form from "@/components/trsmsg-form/300"; 

export default function test() {
  return (
    <div className="flex flex-col items-center max-w-full">
      <h1 className={title({color: "violet"})}>[300] 포인트 사용 전문</h1>      
      <br />
      <h2 className={subtitle({ class: "mt-4" })}>포인트 사용</h2>
      { < Form trsMsgCd={"300"} />} {/* Content 컴포넌트 사용 */}
    </div>
  );
}
