import { Button } from "@/components/ui/button";
import { Check, SparkleIcon } from "lucide-react";

const Plan = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">料金プラン</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          あなたのニーズに合わせて最適なプランをお選びください。
        </p>
      </div>

      <div>
        <div className="border rounded-xl bg-card p-8 shadown-sm flex flex-col">
          <div>
            <div>
              <div>
                <SparkleIcon />
                <h2>Starter</h2>
              </div>
              <p>個人利用に最適なエントリープラン</p>
            </div>

            <div>
              <span>1000</span>
              <span>/月</span>
            </div>

            <ul>
              <li>
                <Check />
                <span>月50クレジット付与</span>
              </li>
              <li>
                <Check />
                <span>基本的な画像生成</span>
              </li>
            </ul>
          </div>

          <form>
            <Button>Starterプランを選択</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Plan
