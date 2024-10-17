import { title, subtitle } from "@/components/primitives";
import Form from "@/components/cjone-test-form";

export default function trsmsg400() {
  return (
    <div className="flex flex-col items-center">
      <h1 className={title({color: "violet"})}>[400] 포인트 혼합 전문</h1>      
      <br />
      <h2 className={subtitle({ class: "mt-4" })}>포인트 적립 + 사용</h2>
      { < Form trsMsgCd={"400"} />} {/* Content 컴포넌트 사용 */}
    </div>
  );
}
