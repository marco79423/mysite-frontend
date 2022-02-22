# 丟丟


## 專案架構

    packages.json
    next.config.js

    public/                          # 靜態檔案
    pages/                           # 頁面
        index.js                     # 首頁
        dice/index.js                # 骰子列表頁
        dice/[id].js                 # 個別骰子頁
        api/                         # 後端 API 轉發

    containers/
        DieBox/
    

    components/
        layout/
            DieListLayout.js     # 骰子列表頁
            RollingDieLayout.js  # 個別骰子頁
                    
    hooks/
    utils/
    core/
