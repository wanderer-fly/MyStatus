document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.floatWindow');
    let isDragging = false;
    let currentElement = null;
    let offsetX, offsetY;

    windows.forEach(el => {
        el.addEventListener('mousedown', (event) => {
            if (event.ctrlKey) {
                isDragging = true;
                currentElement = el;
                // 获取元素的初始位置
                const rect = currentElement.getBoundingClientRect();
                offsetX = event.clientX
                offsetY = event.clientY

                // 设置高 z-index 以确保拖动的元素在其他元素之上
                currentElement.style.zIndex = 10000;
                currentElement.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (event) => {
            if (isDragging && currentElement) {
                // 计算新的位置
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                // 设置新的位置
                currentElement.style.left = `${x}px`;
                currentElement.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                if (currentElement) {
                    currentElement.style.cursor = 'grab';
                    currentElement.style.zIndex = ''; // 重置 z-index
                }
                currentElement = null;
            }
        });
    });
});
