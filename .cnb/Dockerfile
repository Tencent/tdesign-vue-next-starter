FROM node:22

RUN curl -fsSL https://code-server.dev/install.sh | sh \
  && code-server --install-extension cnbcool.cnb-welcome \
  && code-server --install-extension redhat.vscode-yaml \
  && code-server --install-extension dbaeumer.vscode-eslint \
  && code-server --install-extension waderyan.gitblame \
  && code-server --install-extension mhutchie.git-graph \
  && code-server --install-extension donjayamanne.githistory \
  && code-server --install-extension tencent-cloud.coding-copilot@3.1.19 \
  && code-server --install-extension vue.volar \
  && echo done

# 安装 ssh 服务，用于支持 VSCode 等客户端通过 Remote-SSH 访问开发环境
RUN apt-get update && apt-get install -y wget unzip openssh-server


COPY .cnb/mcp-servers.json /root/.local/share/CodeBuddyExtension/Cache/web-VSCode/mcp/settings.json
# tencent-cloud.coding-copilot@3.1.20
COPY .cnb/mcp-servers.json /root/.local/share/code-server/User/globalStorage/tencent-cloud.coding-copilot/settings/Craft_mcp_settings.json


# 指定字符集支持命令行输入中文（根据需要选择字符集）
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
