import * as yaml from 'js-yaml';
import fs from "fs";
import path from "path";

export class AppUtil {
    static CONFIG_DIR: string = path.resolve(__dirname, '../../config')
    private container: Map<string, Set<string>> = new Map<string, Set<string>>();

    constructor() {
        this.setContainer();
    }

    private getConfig(): string[] {
        const files = fs.readdirSync(AppUtil.CONFIG_DIR, "utf8");
        let config: string[] = [];

        for (let i: number = 0; i < files.length; i++) {

            let filePath = path.resolve(AppUtil.CONFIG_DIR, files[i]);
            let fileContent = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

            if (typeof fileContent === "undefined") {
                continue;
            }

            config.push(fileContent);
        }

        return config;
    }

    private setContainer(): void {
        const config = this.getConfig();
        config.forEach((element) => {
            let item = Object.entries(element);
            let dir = path.resolve(__dirname, '../' + Object.values(item[0])[1]);

            if (!fs.existsSync(dir)) {
                return;
            }

            const files = fs.readdirSync(dir, "utf8" );

            files.forEach((file) => {

                let paths: Set<string> = new Set();

                if (this.container.has(Object.values(item[0])[0])) {
                    let mapElement: Set<string> = new Set(this.container.get(Object.values(item[0])[0]));

                    if (!mapElement.has(Object.values(item[0])[1] + '/' +file)) {
                        mapElement.add(Object.values(item[0])[1] + '/' +file);
                        this.container.set(Object.values(item[0])[0], mapElement);
                    }
                    return;
                }

                paths.add(Object.values(item[0])[1] + '/' +file);
                this.container.set(Object.values(item[0])[0], paths);
            })

        })

    }

    public getContainer(): Map<string,Set<string>> {
        return this.container;
    }

}
